记录webpack4.x搭建脚手架的一些关键点

#### 重点

#### babel相关的配置 [babel-loader](https://www.webpackjs.com/loaders/babel-loader/)
为了实现向下兼容，我们需要一个工具用来处理 ES6+ 并将其编译为 ES5，babel 就是做这件事的。
安装时注意[版本兼容问题](https://www.webpackjs.com/loaders/babel-loader/)
> webpack 3.x | babel-loader 8.x | babel 7.x
```shell script
npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack
```

> webpack 3.x babel-loader 7.x | babel 6.x
```shell script
npm install babel-loader babel-core babel-preset-env webpack
```

###### babel-loader和@babel/core的关系
`@babel/core` 是 `babel` 编译库的核心包，它负责把 `js` 代码分析成 `ast (抽象语法树）`，方便各个插件分析语法，并进行相应的处理。注意，它本身并不对语法做处理。

`babel-loader` 是 `webpack` 调用 `babel`的`@babel/core`的一个`loader`，`webpack` 通过这个 `laoder` 来将 `babel` 的能力集成进来，所以，`babel-loader` 依赖了`@babel/core`, 这就是安装 `babel-loader` 需要同时安装 `@babel/core` 的原因。

```shell script
npm install babel-loader @babel/core --save-dev
```
###### @babel/preset-env是什么？
因为我们在 `webpack` 中只配置了 `babel-loader`，`babel-loader` 调用 `@babel/core` 将 `js` 转换成为 `ast`，但我们并没有告诉 `babel` 要如何对装换后的 `ast` 做处理，所以代码原封不动的变了回来。

所以我们需要额外增加`@babel/preset-env`预设。

为什么要这么做呢？我们假设 ES6 有 10 个新特性，那为了把 ES6 转换成 ES5 就需要安装 10 个转换插件，配置文件很长不说，`npm install` 的时间也会很长。为了解决这个问题，`babel` 还提供了一组插件的集合，就叫 `presets`。

```shell script
npm install @babel/preset-env --save-dev
```
此时配置为:
```json
{
  "presets": ["@babel/preset-env" ]
}
```

###### babel-polyfill
此时`const` 和 `let` 已经被变成了 `var`，箭头函数也转换成了普通函数，`presets` 生效了。

但是还有一个问题，就是 `Promise` 还是 `Promise`，`Array` 的扩展方法 `includes` 也没变， 在低版本浏览器里，这两者都不支持，但是 `babel` 并不会帮你处理，因为这不是语法编译层面需要做的事情，于是，如果我们要让打包出来的代码能兼容低版本浏览器，还要考虑到 `Promise`，`includes` 这样的新语法的不兼容的问题。

怎么解决呢，简单一点的做法就是通过 `babel-polyfill` 解决。你只需要全局安装一下 `babel-polyfill`，然后在项目中引用，就不会有兼容性问题了。`babel-polyfill` 做的事情也比较简单，就是预先将` Set `等不支持的语法用 ES5 的语法实现，这样我们使用 `Promise `的时候使用的就是预先引入的用ES5 实现的 `Promise`垫片。
>npm install @babel/babel-polyfill --save
>
>入口文件 import 'babel-polyfill'

这样做也存在一些问题。

第一个问题就是我的包大小剧增，原因也很简单，我只用了 Set 这个方法，但是我却将整个包都引了进来。

第二个问题就是它会污染全局环境，它给很多类的原型链上都作了修改，如果我们开发的是一个给别人使用的库，那就是比较严重的问题。

由于 Babel 在 7.4.0 版本中宣布废弃 @babel/polyfill ，而是通过 core-js 替代。

对于第一个问题，最好的方式就是按需引用，用什么就引什么，如果能过根据适配的浏览器，只引入当前浏览器不支持的特性，那就更好了，preset-env 提供了一种方案， preset-env 中有一个重要的参数叫做 useBuiltIns，我们进行如下配置。
```shell script
npm install core-js regenerator-runtime --save
```
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

modules:  表示指定将 `es6 modules` 转换为何种模块规范。一般在 webpack 项目中，我们会将此参数设置为 false，既将 module 交由 webpack 处理，而不是 babel。

useBuiltIns: 是一个比较关键的参数，在 `@babel/preset-env` 中通过 `useBuiltIns` 参数来控制垫片注入。它可以设置为 `'entry'`、`'usage'` 和 `false` 。默认值为 `false`，不注入垫片。 它是控制 `@babel/preset-env` 使用何种方式帮我们导入 `polyfill` 垫片，`usage` 表示我们只导入我们使用过的。

corejs: 使用 `core-js` 来按需给内置类型打上 `polyfill`, 3 表示 corejs 的版本，为什么要同时安装 `core-js` 和 `regenerator-runtime` 呢，我们可以认为，`croe-js` 提供了 ES5、ES6 规范中新定义的各种对象、方法的模拟实现，`regenerator-runtime` 用来实现 ES6/ES7 中 `generators`、`yield`、`async` 及 `await` 等相关的 `polyfills`。
多说一句，`@babel/polyfill` 是一个简单的包，包含 `core-js` 和 `regenerator-runtime` 这两个包。当 `core-js` 升级到 3.0 的版本后，将放弃使用 `@babel/polyfill`，因为它只包含`core-js` 2.0 的版本，如果是新项目的话，就不要再直接用 `@babel/polyfill` 了，毕竟 `core-js` 2.0 的版本中的特性没有 3.0 的全。

对于第二个问题，使用 `preset-env` 配置 `corejs` 的方式是不生效的，`Array` 的原型链上增加了 `includes` 方法。
`
那怎么处理全局污染的问题，出现了 `babel-runtime` 和 `babel-plugin-transform-runtime`，我们安装这个插件。
```shell script
npm install @babel/plugin-transform-runtime --save-dev

npm install @babel/runtime @babel/runtime-corejs3 --save
```
>注意，babel-plugin-transform-runtime 安装在 devDependencies，而 babel-runtime 安装在 dependencies，那是因为 babel-runtime 是需要在运行时引用的。runtime-corejs3 是提供给 @babel/runtime 适应的

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
            "version": 3,
            "proposals": true
        },
        "useESModules": true
      }
    ]
  ]
}
```
`babel-runtime` 是由 `Babel` 提供的 `polyfill` 库。在使用时，你需要自己去 `require`，举一个例子，如果你想使用 `Promise`，你必须在每一处需要用到 `Promise` 的 `module` 里，手工引入 `promise` 模块，这种方式十分繁琐。

`Babel `提供了一个插件用于简化引用操作，即 `babel-plugin-transform-runtime`，这个插件让 `Babel` 发现代码中使用到 `Symbol`、`Promise`、`Map` 等新类型时，自动且按需进行 `polyfill`。

使用 `plugin-transform-runtime` 插件不会造成全局污染，这点很重要，所以如果是要写一个库给比人用的话，就用这种方法。

###### 总结

@babel/preset-env + core-js + regenerator-runtime 方法配置简单，能按需引入 polyfill，自己实现一个前端应用的时候建议使用。

@babel/runtime + @babel/plugin-transform-runtime + @babel/runtime-corejs3 的方式不会造成全局污染，适用于发布第三方包的时候使用


[babel 7：不仅是会用](https://zhuanlan.zhihu.com/p/131566326)

[前端科普系列-Babel：把 ES6 送上天的通天塔](https://zhuanlan.zhihu.com/p/129089156)

#### postcss相关

什么是 PostCss？
提供了一种方式用 JavaScript 代码来处理 CSS。它负责把 CSS 代码解析成抽象语法树结构（Abstract Syntax Tree，AST），再交由插件来进行处理。插件基于 CSS 代码的 AST 所能进行的操作是多种多样的，比如可以支持变量和混入（mixin），增加浏览器相关的声明前缀，或是把使用将来的 CSS 规范的样式规则转译（transpile）成当前的 CSS 规范支持的格式。从这个角度来说，PostCSS 的强大之处在于其不断发展的插件体系。目前 PostCSS 已经有 200 多个功能各异的插件。开发人员也可以根据项目的需要，开发出自己的 PostCSS 插件。

[官网地址](https://postcss.org/)

[github 地址](https://github.com/postcss/postcss)

###### 安装
postcss 是基于 node 编写的，`postcss-loader` 用来对.css 文件进行处理，并添加在 `style-loader` 和 `css-loader` 之后,因此可以使用 npm 安装
```shell script
npm install  postcss postcss-loader -D
```
###### 配置文件
和 webpack 类似，postcss 有自己的配置文件，该配置文件会影响 postcss 的某些编译行为。
配置文件的默认名称是：`postcss.config.js`
```javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
###### 插件
光使用 postcss 是没有多少意义的，要让它真正的发挥作用，需要安装插件

[postcss 的插件市场](https://www.postcss.parts/)

- postcss-preset-env

 过去使用 `postcss` 的时候，往往会使用大量的插件，它们各自解决一些问题,这样导致的结果是安装插件、配置插件都特别的繁琐。
 于是出现了这么一个插件 `postcss-preset-env`，它称之为 postcss 预设环境，大意就是它整合了很多的常用插件到一起，并帮你完成了基本的配置，你只需要安装它一个插件，就相当于安装了很多插件了，这就跟`babel`非常相识了

```shell script
npm install postcss-preset-env -D
```
安装好该插件后，在 postcss.config.js 配置中加入下面的配置

```javascript
module.exports = {
    plugins: {
        "postcss-preset-env": {} // {} 中可以填写插件的配置
    }
}
```
- Autoprefixer
 Autoprefixer 是一个流行的 PostCSS 插件，其作用是为 CSS 中的属性添加浏览器特定的前缀。由于 CSS 规范的制定和完善一般需要花费比较长的时间，浏览器厂商在实现某个 CSS 新功能时，会使用特定的浏览器前缀来作为正式规范版本之前的实验性实现。比如 Webkit 核心的浏览器使用-webkit-，微软的 IE 使用-ms-。为了兼容不同浏览器的不同版本，在编写 CSS 样式规则声明时通常需要添加额外的带前缀的属性。

> 注：postcss-preset-env内部包含了该库，自动有了该功能。 
>
```shell script
npm install autoprefixer -D
```

安装好该插件后，在 postcss.config.js 配置中加入下面的配置

```javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
处理前的css代码：
```css
.container{
  display: flex;
}
:fullscreen{
  color: #2c3e50;
}
```
处理后的css代码：
```css
.container{
  display: flex;
}
:-webkit-full-screen{
  color: #2c3e50;
}
:-ms-fullscreen{
  color: #2c3e50;
}
:fullscreen{
  color: #2c3e50;
}
```

如果需要调整兼容的浏览器范围，可以通过下面的方式进行配置:

【方式 1】：添加 `.browserslistrc` 文件

创建文件`.browserslistrc`，填写配置内容
```text
last 2 version
> 1%
```
【方式 2】：在package.json的配置中加入`browserslist`
```json
{
  "browserslist" : [
    "last 2 version",
    "> 1%"
  ]
}
```
browserslist 是一个多行的（数组形式的）标准字符串。

它的书写规范多而繁琐，详情见：[browserslist](https://github.com/browserslist/browserslist)

一般情况下，大部分网站都使用下面的格式进行书写
```text
last 2 version
> 1% in CN
not ie <= 8
```
last 2 version: 浏览器的兼容最近期的两个版本

1% in CN: 匹配中国大于 1%的人使用的浏览器， in CN 可省略

not ie <= 8: 排除掉版本号小于等于 8 的 IE 浏览器☛默认情况下，匹配的结果求的是并集。

可以通过网站：[https://browserl.ist/](https://browserl.ist/)   对配置结果覆盖的浏览器进行查询，查询时，多行之间使用英文逗号分割。

☛browserlist 的数据来自于 Can I Use 网站，由于数据不是实时的，所以不会特别准确


[CSS 工程化](https://xie.infoq.cn/article/ea544e38c14f7b4cfc6c41571)

#### 用到的插件

###### [HtmlWebpackPlugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)
该插件将为你生成一个 HTML5 文件， 其中包括使用 `script` 标签的 `body` 中的所有 `webpack` 包。


###### package.json
每一个项目都需要一个` package.json` 文件，它的作用是记录项目的配置信息，比如我们的项目名称、包的入口文件、项目版本等，也会记录所需的各种依赖，还有很重要的` script `字段，它指定了运行脚本命令的 `npm `命令行缩写。

###### .gitignore
该文件决定了项目进行 git 提交时所需要忽略掉的文件或文件夹，编辑器如 `vscode` 也会监听 `.gitignore`之外的所有文件，如果没有进行忽略的文件有所变动时，在进行` git `提交时就会被识别为需要提交的文件。
`node_modules`是我们安装第三方依赖的文件夹，这个肯定要添加至 `.gitignore`中，且不说这个文件夹里面成千上万的文件会给编辑器带来性能压力，也会给提交至远端的服务器造成不小损失，另外就是这个文件夹中的东西，完全可以通过简单的` npm install`就能得到～

###### .editorconfig
`.editorconfig` 是跨编辑器维护一致编码风格的配置文件，有的编辑器会默认集成读取该配置文件的功能.

