const WS = require('ws')

const server = new WS.Server({ port: 8000 }) //地址端口一定跟前端连接的一致

server.on('open', handleOpen)
server.on('error', handleError)
server.on('connection', handleConnection)  //连接时注册接收消息事件
function handleConnection(ws) {
    console.log('server websocket connection', ws)
    // 服务端接收到消息
    ws.on('message', handleMessage)
}

function handleMessage(message) {
    console.log(message)
    broadcast(message)
}

function broadcast(message) {
    server.clients.forEach((c) => {
        //遍历客户端 广播所有客户端
        console.log(c.send)
        c.send(message) //发送
    })
}


function handleOpen(e) {
    console.log('server websocket open', e);
}

function handleError(e){
    console.log('server websocket error', e);
}



