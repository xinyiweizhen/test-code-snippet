## 移动端特点

移动端与 PC 端网页有所不同，有以下几个特点

- 小屏幕
- 触摸交互
- [屏幕尺寸繁多](http://screensiz.es/)

## 相关概念

#### 屏幕大小

屏幕大小指屏幕的对角线的长度，单位一般是英寸。常见的手机屏幕大小 3.5、4、4.7、5.0、5.5、6.0等。常见手机屏幕查看网址 <http://screensiz.es/> 

![image](http://cdn.xiaohigh.com/0e282600899877b3bae812bda0b78d92.png)



注意:

* 英寸的英文为 inch , 英尺的英文是 foot          4.7 inch

* 1 foot = 12 inch        1 inch=2.54 cm

#### 屏幕分辨率

屏幕分辨率是指屏幕横纵向上的像素点数。一般表示形式 x * y 或者 y * x 表示。例如 IPhone 6 的屏幕分辨率为 750 * 1334，华为 P30 的分辨率为 2340 * 1080。

![image](http://cdn.xiaohigh.com/77143261161a1e8dda9ecceaacb08baa.png)

注意:

* 屏幕分辨率是一个固定值，生产出来就固定了，无论手机屏幕还是电脑屏幕。
* 屏幕分辨率与显示分辨率不同。计算机可以修改显示分辨率，信号传递给屏幕，屏幕会进行计算，在屏幕上显示。
* 1080P 的分辨率是1920x1080   720P   1280 * 720
* 2K 屏幕是单一方向分辨率具有约 2000 像素的显示设备。最标准的 2K 分辨率为 2048×1024

几款手机的分辨率

| 型号             | 分辨率      |
| ---------------- | ----------- |
| IPhone 3GS       | 320 * 480   |
| IPhone 4 / 4s    | 640 * 960   |
| IPhone 5 / 5s    | 640 * 1136  |
| IPhone 6 / 7 / 8 | 750 * 1334  |
| 华为 P30         | 1080 * 2340 |
| IPhone X         | 1125 * 2436 |

### 像素相关

#### 物理像素 / 设备像素

设备像素 / 物理像素是一个长度单位。 1 物理像素对应显示设备中一个微小的物理部件。

设备像素是手机屏幕的一个参数，由手机制造商决定。例如 IPhone 6 的物理像素为 750 * 1334

![像素](http://cdn.xiaohigh.com/ce6d1ac7b1aceb99ffc5ae0ec4300702.png)

#### 设备独立像素  /  设备无关像素 

设备独立像素，简称 DIP（device-independent pixel）,又称为设备无关像素，是一个长度计量单位。

设备独立像素也是手机屏幕的一个参数，由手机制造商决定。例如IPhone 6 的设备独立像素为 375 * 667

1 个设备独立像素可以认为是计算机坐标系统中的一个点，代表可以通过程序控制使用的虚拟像素。

* 普通屏幕下 1 设备独立像素 等于 1 物理像素
* 高清屏幕下 1 设备独立像素 等于 N 物理像素

## 视口

#### PC 端

在 PC 端，视口指的是浏览器的可视区域。其宽度和浏览器窗口的宽度保持一致。在 CSS 标准文档中，视口也被称为初始包含块，它是所有 CSS 百分比宽度推算的根源。

#### 移动端

移动端的视口与 PC 端不同，有三个视口

- 布局视口
- 视觉视口
- 理想视口

##### 布局视口

布局视口是用来放置网页内容的区域。

一般移动设备的浏览器都默认定义一个虚拟的布局视口（layout viewport），用于解决[早期的页面](http://www.shindoo.com/index.asp)在手机上显示的问题。 视口大小由浏览器厂商决定，<span style="color:#ee0b41">大多数设备的布局视口大小为 980px</span>。

获取方式

```js
document.documentElement.clientWidth 
document.documentElement.clientHeight
```


##### 视觉视口

视觉视口就是用户可见的区域。

获取方式

```js
window.innerWidth
window.innerHeight
```

<span style="color:#ee0b41">注：不缩放的情况下，视觉视口宽度 == 布局视口宽度。</span>

##### 理想视口

宽度与屏幕同宽的布局视口称为理想视口。 理想视口的好处

* 用户不需要缩放和滚动条就能看到网站的全部内容。
* 针对移动端的设计稿更容易开发。

<span style="color:#ee0b41">注意：理想视口不是真实存在的视口</span>

设置理想视口的方法

```html
<meta name="viewport" content="width=device-width" />
// 或者
<meta name="viewport" content="initial-scale=1.0" />
// 合体
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
```

## <span style="color:blue">缩放</span>

### PC 端

放大时

- 布局视口变小
- 视觉视口变小
- 元素的像素大小不变

缩小时

- 布局视口变大
- 视觉视口变大
- 元素的像素大小不变

### 移动端

放大时

- 布局视口不变
- 视觉视口变小

缩小时

- 布局视口不变
- 视觉视口变大

<span style="color:#ee0b41">注意：移动端缩放不会影响页面布局</span>

### <span style="color:#ee0b41">真机测试流程</span>

真机测试是项目测试必需的一个流程，一定要掌握！！！

0. 关闭防火墙

1. webstorm -> ctrl + alt + s -> 搜索 debugger -> 修改端口并选中两个多选框  端口要大于 1024  建议用 8000 8888
2. 使 PC 与手机处于同一个网络。手机连接电脑 wifi，或者电脑连接手机热点，<span style="color:#ee0b41">两者在同一个 wifi 下最方便</span>。
3. cmd 查看电脑无线网卡的 IP（ipconfig）
4. webstorm 在浏览器中预览文件，将 localhost 更改为 IP  
5. 打开草料网址 https://cli.im/ 将 URL 转化为二维码，手机扫描即可 😎

## viewport 控制

viewport 标签是苹果公司在 2007 年引进的，用于移动端布局视口的控制。

<span style="color:#ee0b41">使用示例</span>

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scaleable=no,maximum-scale=1.0, minimum-scale=1.0">
```

viewport 相关选项

- width  布局视口宽度
- initial-scale  初始化缩放比例
- minimum-scale  最小缩放比例
- maximum-scale 最大缩放比例
- user-scalable  设置是否允许用户缩放
- viewport-fit   auto/contain/cover

| 属性          | 含义                       | 取值                             |
| ------------- | -------------------------- | -------------------------------- |
| width         | 定义视口的宽度，单位为像素 | 正整数或设备宽度device-width     |
| height        | 定义视口的高度，单位为像素 | 正整数或device-height            |
| initial-scale | 定义网页初始缩放值         | 整数或小数，小数为缩小，反之放大 |
| maximum-scale | 定义缩放最大值             | 整数或小数                       |
| minimum-scale | 定义缩放最小值             | 整数或小数                       |
| user-scalable | 定义用户是否可以缩放       | yes/no                           |
| viewport-fit  | 定义如何填充屏幕           | auto/contain/cover               |

#### width  

<span style="color:#ee0b41">width 值可以是数字，也可以是设备宽度表示  device-width，这样可以得到完美视口</span>

#### initial-scale  

initial-scale 为页面初始化时的显示比例。

scale = 屏幕宽度独立像素  /  布局视口宽度。  // iphone6  0.5  

注意：

* chrome 测试该参数会有偏差，真机测试
* <span style="color:#ee0b41">initial-scale = 1.0 也可以得到完美视口</span>
* initial-scale 会影响布局视口和视觉视口的大小
* width 与 initial-scale 同时设置时，会选择尺寸较大的那个

#### minimum-scale

设置允许用户最小缩放比例。

minimum-scale = 屏幕独立像素宽度 / 视觉视口   //iphone 6    0.5

#### maximum-scale

设置允许用户最大缩放比例，苹果浏览器 safari 不认识该属性

maximum-scale = 屏幕独立像素宽度 / 视觉视口  // 2

#### user-scalable

是否允许用户通过手指缩放页面。苹果浏览器 safari 不认识该属性。

#### viewport-fit

设置为 cover 可以解决『刘海屏』的留白问题

![](<http://cdn.xiaohigh.com/f7bfdd0349972720cc99672529f5ad75.png>)

## 适配

移动端设备的屏幕尺寸繁多，要想让页面的呈现统一，需要对不同尺寸的设备进行适配。适配的方式主要有以下几种

- viewport缩放方案
- 动态rem方案
- vw（百分比）适配方案

#### viewport缩放方案

核心过程：

在写HTML、CSS对设计稿进行还原时不关注屏幕尺寸的差异，而是直接按设计稿的标注来开发。比如设计稿里标注的文字字号是30 px，CSS里就设置文字字号30 px。

页面开发好后，在HTML的head标签里加入

```html
<meta name="viewport" content="width={设计稿宽度}, initial-scale={屏幕逻辑像素宽度/设计稿宽度}" >
```

举个例子。假设设计师交付的设计稿宽度是750 px，设计稿上一个标题字号标注的是32 px 、margin是20 px。我们以标注的大小来写CSS。之后需要通过JavaScript计算获取屏幕的宽度（假设需要适配逻辑像素宽度是428 px的屏幕），在HTML的head里添加 

```html
<meta name="viewport" content="width=750px, initial-scale=0.57" >
```

即可（428/759 = 0.57）。

这段代码的意思是：设置布局视口(layout viewport)的宽度为750 px（此时页面一般会超出屏幕），再缩放页面（initial-scale）使其恰好撑满屏幕。

优点与缺点：

- 优点：开发流程很简单，工程师只需根据设计稿标注还原页面，不需要额外计算。适配范围广。
- 缺点：页面整体放大缩小，对于不想缩放的元素无法控制。比如边框在大屏手机下显得很粗，在小屏手机下显得很细。

#### 动态rem方案

- 百度、腾讯方案

  核心过程：

  1. 开启理想视口

     ```html
     <!--  1. 设置理想视口  -->
     <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scaleable=no,maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
     ```

  2. 设置根字体： 根字体 = (设备横向独立像素值 * 100 ) / 设计稿宽度

     ```javascript
         function adapter() {
             // 获取布局视口宽度， 因为开启了理想视口，布局视口 = 设备横向独立像素值
             const dpWidth = document.documentElement.clientWidth;
             // 计算根字体大小 根字体 = (设备横向独立像素值 * 100 ) / 设计稿宽度
             const rootFontSize = dpWidth * 100 / 375;
             // 设置跟字体大小
             document.documentElement.style.fontSize = rootFontSize;
         }
         adapter()
         document.onresize = adapter
     ```

  3. 编写样式时，计算取值， 值为：设计值 / 100

     直接以rem为单位

     取值 = 设计值 / 100

     ```css
     .content{
             /* 3.计算值: 取值 = 设计值 / 100 */
             width: 2.45rem;  // 设计值为245px
             height: 2rem;
             margin: 0 auto;
             margin-top: 0.1rem;
             background: black;
         }
     ```

- 搜狐、唯品会方案

  核心过程：

  1. 开启理想视口

     ```html
     <!--  1. 设置理想视口  -->
     <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scaleable=no,maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
     ```

  2. 设置根字体： 根字体 = 设备横向独立像素值 / 10

     ```javascript
     /**
          * 2. 动态设置根字体
          */
         function adapter() {
             // 获取布局视口宽度， 因为开启了理想视口，布局视口 = 设备横向独立像素值
             const dpWidth = document.documentElement.clientWidth;
             // 计算根字体大小
             const rootFontSize = dpWidth / 10;
             // 设置跟字体大小
             document.documentElement.style.fontSize = rootFontSize;
         }
         adapter()
         document.onresize = adapter
     ```

  3. 编写样式时，计算取值， 值为：设计值 / (设计稿值 / 10)

     直接以rem为单位

     取值 = 设计值 / (设计稿值 / 10)

     ```css
     .content{
             /* 3.计算值： q值 = 设计值 / (设计稿宽度 / 10)*/
             width: 9.2rem;  // 设计值为245px
             height: 4rem;
             margin: 0 auto;
             margin-top: 0.4rem;
             background: black;
         }
     ```

     如果使用less或者scss同理，将换算交给预处理器

     ```scss
     @function torem($px) {
       @return $px / (375px / 10);
     }
     .button {
       width: torem(120);
       font-size: torem(28);
       line-height: torem(48);
       border: 1px solid #000;
       text-align: center;
     }
     ```

#### vw（百分比）适配方案

核心过程：

vw和vh是两个相对单位

- 1 vw = 等于布局视口宽度的1%
- 1 vh = 等于布局视口高度的1%

基于此，我们可以把所有需要适配屏幕大小等比缩放的元素都使用vw/vh做为单位。不需要缩放的元素使用px做单位。

```css
.button {
      width: 16vw;        /*  100vw*120/750  */
      font-size: 3.73vw;  /*  100vw*28/750  */
      line-height: 6.4vw; /*  100vw*48/750  */
      border: 1px solid #000; /*不需要缩放的部分用px*/
      text-align: center;
}

/* 或者使用变量计算 */

:root {
  --ratio: calc(100vw/750);
}
.button {
  font-size: calc(100vw*28/750);  /* 可以直接用calc */
  line-height: calc(100vw*48/750);
  
  width: calc(120*var(--ratio));  /* 也可以用calc配合var使用，IE不支持var */     
  border: 1px solid #000; /*不需要缩放的部分用px*/
  text-align: center;
}
```

如果使用less或者scss同理，将换算交给预处理器

```scss
@function px2vw($px) {
  @return $px * 100vw / 750;
}
.button {
  width: px2vw(120);
  font-size: px2vw(28);
  line-height: px2vw(48);
  border: 1px solid #000;
  text-align: center;
}
```

优点与缺点：

- 优点：适配原理简单，不需要javascript进行适配
- 缺点： vw和vh有一定的浏览器兼容性问题，请见 [Can I use](https://caniuse.com/?search=vw)

