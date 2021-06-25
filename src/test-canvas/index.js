;(function (document){
    const canvas = document.getElementById('canvas')
    console.log(canvas);
    const ctx = canvas.getContext('2d')

    /**
     *  绘制路径
     */
    // 开始绘制路径
    ctx.beginPath();
    // 设置路径起点
    ctx.moveTo(20, 30);
    // 绘制一条到(200, 350)的直线
    ctx.lineTo(160, 30);
    // 设置线宽
    ctx.lineWidth = 1;
    // "butt" | "round" | "square"
    ctx.lineCap = 'round';
    // 设置线的颜色
    ctx.strokeStyle = '#CC0000';

    // moveto和lineto方法可以多次使用
    // 最后，还可以使用closePath方法，自动绘制一条当前点到起点的直线，形成一个封闭图形，省却使用一次lineto方法。
    ctx.moveTo(20, 50);
    ctx.lineTo(50, 50);
    ctx.lineTo(50, 80);
    ctx.lineTo(20, 80);
    ctx.closePath();
    ctx.stroke();


    /**
     * 绘制矩形
     */
    // fillStyle 属性用来设置矩形的填充色
    ctx.fillStyle = '#CC0000';
    // 填充矩形
    ctx.fillRect(80, 50, 30, 30);
    // 空心矩形
    ctx.strokeStyle = '#0000CC';
    ctx.strokeRect(140,50,30,30);
    // 擦除某个矩形区域的内容
    ctx.clearRect(80,50,10,10);

    /**
     * 绘制文本
     */
    // 设置字体
    ctx.font = "Bold 20px Arial";
    // 设置对齐方式
    ctx.textAlign = "left";
    // 设置填充颜色
    ctx.fillStyle = "#008600";
    // fillText方法不支持文本断行，即所有文本出现在一行内。所以，如果要生成多行文本，只有调用多次fillText方法。
    // 设置字体内容，以及在画布上的位置
    ctx.fillText("Hello!", 20, 150);
    // 绘制空心字
    ctx.strokeText("Hello!", 20, 180);

    /**
     *  绘制圆形和扇形
     *   使用 arc方法用来绘制扇形
     *  arc方法的 x和 y参数是圆心坐标，
     *  radius是半径，
     *  startAngle和 endAngle则是扇形的起始角度和终止角度（以弧度表示），
     *  anticlockwise 表示做图时应该逆时针画（true）还是顺时针画（false）。
     *
     */
    // 实心圆
    ctx.beginPath();
    ctx.arc(50, 250, 20, 0, Math.PI*2, true);
    ctx.fillStyle = "#000000";
    ctx.fill();

    // 空心圆
    ctx.beginPath();
    ctx.arc(100, 250, 20, 0, Math.PI*2, true);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // 圆弧
    ctx.beginPath();
    ctx.arc(150, 250, 20, 0, Math.PI, true);
    ctx.fillStyle = "#000000";
    ctx.fill();



}(document))
