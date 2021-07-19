## Canvas速查表

##### 基本用法

```html
<canvas id="canvas" width="150" height="150"></canvas>
```

[`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)看起来和[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)元素很相像，唯一的不同就是`canvas`并没有 `src` 和 `alt` 属性。

`<canvas>` 标签只有两个属性**——** [`width`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas#attr-width)和[`height`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas#attr-height)。当没有设置宽度和高度的时候，`canvas`会初始化**宽度为300像素**和**高度为150像素**。

##### 渲染上下文

`canvas`起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。

`canvas`元素有一个叫做 [`getContext()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext) 的方法，这个方法是用来获得渲染上下文和它的绘画功能。对于2D图像而言，你可以获取到 [`CanvasRenderingContext2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)

```javascript
var canvas = document.getElementById('canvas');
// 语法
var ctx = canvas.getContext(contextType);
var ctx = canvas.getContext(contextType, contextAttributes);
// 获取 CanvasRenderingContext2D
var ctx = canvas.getContext('2d');
```

上下文类型（contextType）

是一个指示使用何种上下文的 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 。可能的值是:

- `"2d`", 建立一个 [`CanvasRenderingContext2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 二维渲染上下文。
- `"webgl"` (或`"experimental-webgl"`) 这将创建一个 [`WebGLRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext) 三维渲染上下文对象。只在实现[WebGL](https://developer.mozilla.org/en-US/docs/Web/WebGL) 版本1(OpenGL ES 2.0)的浏览器上可用。
- "`webgl2`" (或 "`experimental-webgl2`") 这将创建一个 [`WebGL2RenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext) 三维渲染上下文对象。只在实现 [WebGL](https://developer.mozilla.org/en-US/docs/Web/WebGL) 版本2 (OpenGL ES 3.0)的浏览器上可用。
- `"bitmaprenderer"` 这将创建一个只提供将canvas内容替换为指定[`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap)功能的[`ImageBitmapRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmapRenderingContext) 。

##### 检查支持性

替换内容是用于在不支持` <canvas>` 标签的浏览器中展示的。通过简单的测试`getContext()方法的存在，脚本可以检查编程支持性`。

```javascript
var canvas = document.getElementById('canvas');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

##### CanvasRenderingContext2D对象

1. **基本示例**

```javascript
const canvas = document.createElement('canvas');
// 获取画布的2D渲染上下文
const ctx = canvas.getContext('2d');

// 设置画笔宽度
ctx.lineWidth = 10;

// 画墙
ctx.strokeRect(75, 140, 150, 110);

// 门
ctx.fillRect(130, 190, 40, 60);

// 屋顶
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();
```

图形如下：

![img](data:image/png;base64,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)

2. **CanvasRenderingContext2D对象属性**

   - [线型](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#线型)

     - [`lineWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth) (常用)

       线的宽度。默认 `1.0`

     - [`lineCap`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap) (常用)

       线末端的类型。 允许的值： `butt` (默认), `round`（线段末端以圆形结束）, `square`(线段末端以方形结束).

       ![lineCap](https://mdn.mozillademos.org/files/236/Canvas_linecap.png)

     - [`lineJoin`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin) (常用)

       定义两线相交拐点的类型。允许的值：`round`, `bevel`, `miter`(默认)。

       ![lineJoin](https://mdn.mozillademos.org/files/237/Canvas_linejoin.png)

     - [`miterLimit`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)

       斜接面限制比例。默认 `10。`

     - [`lineDashOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)

       描述在哪里开始绘制线段。

   - [文本样式](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#文本样式)

     - [`font`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/font)

       字体设置。 默认值 `10px sans-serif。`

     - [`textAlign`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign)

       文本对齐设置。 允许的值： `start` (默认), `end`, `left`, `right` 或 `center`.

     - [`textBaseline`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textBaseline)

       基线对齐设置。 允许的值： `top`, `hanging`, `middle`, `alphabetic` (默认),`ideographic`, `bottom`.

     - [`direction`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/direction)

       文本的方向。 允许的值： `ltr, rtl`, `inherit` (默认).

   - [填充和描边样式](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#填充和描边样式)

     - [`fillStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle)

       图形内部的颜色和样式。 默认 `#000` (黑色).

     - [`strokeStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle)

       图形边线的颜色和样式。 默认 `#000` (黑色).

   - [阴影](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#阴影)

     - [`shadowBlur`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur)

       描述模糊效果。 默认 `0`

     - [`shadowColor`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor)

       阴影的颜色。 默认`fully-transparent black`.

     - [`shadowOffsetX`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)

       阴影水平方向的偏移量。 默认 `0`.

     - [`shadowOffsetY`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)

       阴影垂直方向的偏移量。 默认 `0`.

3. **CanvasRenderingContext2D对象方法**

   - [绘制矩形](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#绘制矩形)

     - [`clearRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect) (常用)

       设置指定矩形区域内（以 点 *(x, y)* 为起点，范围是*(width, height)* ）所有像素变成透明，并擦除之前绘制的所有内容。

     - [`fillRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect) (常用)

       绘制填充矩形，矩形的起点在 *(x, y)* 位置，矩形的尺寸是 *width* 和 *height* 。

     - [`strokeRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect) (常用)

       在 canvas 中，使用当前的笔触样式，描绘一个起点在 *(x, y)* 、宽度为 *w* 、高度为 *h* 的矩形。

     参数说明：

     > x: 矩形起点的 x 轴坐标。
     >
     > y: 矩形起点的 y 轴坐标。
     >
     > width: 矩形的宽度。正值在右侧，负值在左侧。
     >
     > height: 矩形的高度。正值在下，负值在上。

   - [绘制文本](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#绘制文本)

     - [`fillText(text, x, y, [maxWidth])`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillText)  (常用)

       在(x,y)位置绘制（填充）文本。

     - [`strokeText(text, x, y [, maxWidth])`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeText)(常用)

       在(x,y)位置绘制（描边）文本。

     - [`measureText(text)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText)

       返回 [`TextMetrics`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics) 对象。参见 [`TextMetrics`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics) 对象获取文本属性。

     参数说明：

     > text: 使用当前的 [`font`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/font), [`textAlign`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign), [`textBaseline`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textBaseline) 和 [`direction`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/direction) 值对文本进行渲染。
     >
     > x: 文本起点的 x 轴坐标。
     >
     > y: 文本起点的 y 轴坐标。
     >
     > maxWidth( 可选): 绘制的最大宽度。如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。

   - [线型](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#线型)

     - [`getLineDash()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getLineDash)

       返回当前线段样式的数组，数组包含一组数量为偶数的非负数数字。

     - [`setLineDash(segments)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash)

       设置当前的线段样式。

       参数说明：

       > segments: 
       >
       > 一个[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， `[5, 15, 25]` 会变成 `[5, 15, 25, 5, 15, 25]。`

   - [渐变和图案](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#渐变和图案)

     - [`createLinearGradient(x0, y0, x1, y1)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)

       创建一个沿着参数坐标指定的线的线性渐变。该方法返回一个线性 [`CanvasGradient`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasGradient)对象。想要应用这个渐变，需要把这个返回值赋值给 [`fillStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle) 或者 [`strokeStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle)。

     - [`createRadialGradient(x0, y0, r0, x1, y1, r1)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)

       创建一个沿着参数坐标指定的线的放射性性渐变。

     - [`createPattern()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createPattern)

       使用指定的图片 (a [`CanvasImageSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasImageSource))创建图案。通过 repetition 变量指定的方向上重复源图片。此方法返回 [`CanvasPattern`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasPattern)对象。

   - [路径](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#路径)

     - [`beginPath()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/beginPath)（常用）

       清空子路径列表开始一个新的路径。当你想创建一个新的路径时，调用此方法。

     - [`closePath()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/closePath)（常用）

       使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。

     - [`moveTo(x，y)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/moveTo)（常用）

       将一个新的子路径的起始点移动到(x，y)坐标。

     - [`lineTo(x，y)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineTo)（常用）

       使用直线连接子路径的最后的点到x,y坐标。

     - [`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo) （常用）

       添加一个3次贝赛尔曲线路径。该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 `moveTo()` 进行修改。

     - [`quadraticCurveTo(cpx, cpy, x, y)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo)（常用）

       添加一个2次贝赛尔曲线路径。

     - [`arc(x, y, radius, startAngle, endAngle, anticlockwise)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc)

       绘制一段圆弧路径， 圆弧路径的圆心在 *(x, y)* 位置，半径为 *r* ，根据*anticlockwise* （默认为顺时针）指定的方向从 *startAngle* 开始绘制，到 *endAngle* 结束。

     - [`arcTo(x1, y1, x2, y2, radius)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arcTo)

       根据控制点和半径绘制圆弧路径，使用当前的描点(前一个moveTo或lineTo等函数的止点)。根据当前描点与给定的控制点1连接的直线，和控制点1与控制点2连接的直线，作为使用指定半径的圆的**切线**，画出两条切线之间的弧线路径。

     - [`ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/ellipse) **这是一个实验中的功能**

       添加一个椭圆路径，椭圆的圆心在（x,y）位置，半径分别是*radiusX* 和 *radiusY* ，按照*anticlockwise* （默认顺时针）指定的方向，从 *startAngle* 开始绘制，到 *endAngle* 结束。

     - [`rect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/rect) （常用）

       创建一个矩形路径，矩形的起点位置是 *(x, y)* ，尺寸为 *width* 和 *height*。

   - [绘制路径](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#绘制路径)

     - [`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill)（常用）

       使用当前的样式填充子路径。

     - [`stroke()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/stroke)（常用）

       使用当前的样式描边子路径。

     - [`drawFocusIfNeeded()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawFocusIfNeeded)

       如果给定的元素获取了焦点，那么此方法会在当前的路径绘制一个焦点。

     - [`scrollPathIntoView()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/scrollPathIntoView)

       将当前或给定的路径滚动到窗口。

     - [`clip()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clip)（常用）

       从当前路径创建一个剪切路径。在  **clip()** 调用之后，绘制的所有信息只会出现在剪切路径内部。例如： 参见 Canvas教程中的 [剪切路径](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing) 。

     - [`isPointInPath()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/isPointInPath)（常用）

       判断当前路径是否包含检测点。

     - [`isPointInStroke()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/isPointInStroke)（常用）

       判断检测点是否在路径的描边线上。

   - [绘制图像](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#绘制图像)

     - [`drawImage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)（常用）

       绘制指定的图片。该方法有多种格式，提供了很大的使用灵活性。

   - [像素控制](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#像素控制)

     参见 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象。

     - [`createImageData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createImageData)

       使用指定的尺寸，创建一个新的、空白的 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象。所有的像素在新对象中都是透明的。

     - [`getImageData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)

       返回一个 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为*(`sx`, `sy`)、*宽为*`sw`、*高为*`sh`*。

     - [`putImageData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)

       将数据从已有的 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 绘制到位图上。 如果提供了脏矩形，只能绘制矩形的像素。 

   - [canvas 状态](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#canvas_状态)

     **canvasRenderingContext2D**渲染环境包含了多种绘图的样式状态（属性有线的样式、填充样式、阴影样式、文本样式）。

     - [`save()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/save)

       使用栈保存当前的绘画样式状态，你可以使用 **restore()** 恢复任何改变。

     - [`restore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/restore)

       恢复到最近的绘制样式状态，此状态是通过 **save()** 保存到”状态栈“中最新的元素。

