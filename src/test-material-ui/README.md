本文件夹将记录material-UI(v4)相关的内容

#### 介绍

[MATERIAL-UI](https://material-ui.com/zh/)

#### 重点

1. 主题样式
2. style系统

###### 主题

1. 访问一个组件中的主题
   您可能需要访问 React 组件中的主题变量。

   `useTheme` hook

   在函数组件（function components）中的使用：

   ```react
   import { useTheme } from '@material-ui/core/styles';
   
   function DeepChild() {
     const theme = useTheme(); // 拿到主题对象
     return <span>{`spacing ${theme.spacing}`}</span>;
   }
   ```

###### 自定义的组件

您可以轻松地自定义一个 Material-UI 组件的外观。

1. 一次性使用的特定变体

   为实现特定的组件而更改样式，以下有几种解决方案：

   - **[用类名（class names）覆盖样式](https://material-ui.com/zh/customization/components/#overriding-styles-with-class-names)**

     覆盖组件样式的第一种方法是使用**类名（class names）** 。 每个组件都提供一个`className`属性，它通常作用于 root 元素。

     ```react
     import React from 'react';
     import PropTypes from 'prop-types';
     import clsx from 'clsx';
     import Button from '@material-ui/core/Button';
     import { withStyles } from '@material-ui/core/styles';
     
     // We can inject some CSS into the DOM.
     const styles = {
       root: {
         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
         borderRadius: 3,
         border: 0,
         color: 'white',
         height: 48,
         padding: '0 30px',
         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
       },
     };
     
     function ClassNames(props) {
       const { classes, children, className, ...other } = props;
     
       return (
         <Button className={clsx(classes.root, className)} {...other}>
           {children || 'class names'}
         </Button>
       );
     }
     
     ClassNames.propTypes = {
       children: PropTypes.node,
       classes: PropTypes.object.isRequired,
       className: PropTypes.string,
     };
     
     export default withStyles(styles)(ClassNames);
     ```

     此示例使用一个高阶组件[`withStyles()`](https://material-ui.com/zh/styles/basics/#higher-order-component-api)将自定义样式注入 DOM 之中，并通过它的`classes`属性将类名传递给 `ClassNames` 组件。 您可以选择[任何其他的样式解决方案](https://material-ui.com/zh/guides/interoperability/)，或使用纯 CSS 来创建样式，但一定要 考虑[ CSS 的注入顺序](https://material-ui.com/zh/styles/advanced/#css-injection-order) ，当通过 Material-UI 将 CSS 注入 DOM 中而来实现组件的样式时，这些 CSS 将具有最高的优先级，因为`<link>`被注入到`<head />` 的底部，这样的话始终正确地渲染组件。

   - **[用类覆盖样式](https://material-ui.com/zh/customization/components/#overriding-styles-with-classes)**

     当 `className` 属性不足够时，你需要访问更深层的元素，这时则可使用`classes` 对象属性，这样就能够自定义该组件中所有由 Material-UI 注入的 CSS。

     每一个组件的类列表已记录在组件 API 页面中， 请参阅 **CSS 部分**以及**规则名称栏**来获取更多信息。 例如，您可以查看 [Button CSS API](https://material-ui.com/zh/api/button/#css)。 或者，您也可以使用[浏览器的 dev tools](https://material-ui.com/zh/customization/components/#using-the-dev-tools)。

     ```react
     import React from 'react';
     import { makeStyles } from '@material-ui/core/styles';
     import Button from '@material-ui/core/Button';
     
     const useStyles = makeStyles({
       root: {
         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
         borderRadius: 3,
         border: 0,
         color: 'white',
         height: 48,
         padding: '0 30px',
         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
       },
       label: {
         textTransform: 'capitalize',
       },
     });
     
     export default function ClassesNesting() {
       const classes = useStyles();
     
       return (
         <Button
           classes={{
             root: classes.root, // class name, e.g. `classes-nesting-root-x`
             label: classes.label, // class name, e.g. `classes-nesting-label-x`
           }}
         >
           classes nesting
         </Button>
       );
     }
     ```

     这个例子也使用了 `withStyles()` （见上文），但在这里， `ClassesNesting` 使用 `Button` 的 `classes` 属性来提供一个对象，该对象将 **要覆盖的 classes 子项名** （样式规则）映射到 **对应的CSS属性名称** （值）当中。 组件的现有类将继续被注入，因此只需要提供你想要添加或覆盖的特定样式。

     请注意，除按钮样式外，按钮标签的大小写也已更改。





##### System系统

###### [Spacing 间距](https://material-ui.com/zh/system/spacing/)

为了改变一个元素的外观，您可以使用一系列的简写响应式的 margin 和 padding 的辅助工具类。

**符号**

用 space 辅助工具能够将简写的 margin 和 padding 属性转换为margin 和 padding 的 CSS 声明。 而属性则使用 `{property}{sides}` 的格式命名

其中*属性(property)*是以下其中之一：

- `m` - 能够设置 *margin* 的类名
- `p` - 能够设置 *padding* 的类名

而 *sides* 是以下其中之一：

- `t` - 能够设置 *margin-top* 或 *padding-top* 的类名
- `b` - 能够设置 *margin-bottom* 或 *padding-bottom* 的类名
- `l` - 能够设置 *margin-left* 或 *padding-left* 的类名
- `r` - 能够设置 *margin-right* 或 *padding-right* 的类名
- `x` - 能够一起设置 ** -left* 和 ** -right* 的类名
- `y` - 能够一起设置 ** -top* 和 ** -bottom* 的类名
- blank - 能够设置元素的所有 4 个边的 margin 或者 padding 的类名

