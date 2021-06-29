;(function (doc){
    // 实现一个简易画板
    const canvas = doc.getElementById('panel-canvas')

    const eraser = doc.querySelector('.eraser')

    const ctx = canvas.getContext('2d')

    let isDraw = false

    // 鼠标按下事件
    canvas.addEventListener('mousedown', handleCanvasMouseDown, false)

    // 鼠标弹起事件
    canvas.addEventListener('mouseup', handleCanvasMouseUp, false)

    function handleCanvasMouseDown(event) {
        isDraw = true;
        ctx.beginPath();
        var x = event.offsetX;
        var y = event.offsetY;
        ctx.moveTo(x, y);
        // 鼠标移动事件
        canvas.addEventListener('mousemove', handleCanvasMouseMove, false)
    }

    function handleCanvasMouseMove(event) {
        if(!isDraw)return;
        var x = event.offsetX;
        var y = event.offsetY;
        ctx.lineTo(x, y);
        ctx.stroke();

    }

    function handleCanvasMouseUp(event) {
        isDraw = false;
        // 鼠标移动事件
        canvas.removeEventListener('mousemove', handleCanvasMouseMove)
    }




}(document))
