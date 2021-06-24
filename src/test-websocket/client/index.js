;(function (document) {
    const ul = document.querySelector('#ul')
    const input = document.querySelector('#message')
    const button = document.querySelector('#send')

    const ws = new WebSocket('ws://localhost:8000')

    bindEvent()

    function bindEvent() {
        ws.addEventListener('open', handleOpen)
        ws.addEventListener('error', handleError)
        ws.addEventListener('message', handleMessage)
        ws.addEventListener('close', handleClose)
        button.addEventListener('click', handleSend)
    }
    function handleOpen(e) {
        console.log('client open', e);
        if(!localStorage.getItem('username')){
            location.href= 'entry.html'
        }
    }

    function handleError(e) {
        console.log('client open', e);
    }

    function handleMessage(e) {
        console.log('client message', e);
        const message = JSON.parse(e.data)
        const li = document.createElement('li')
        li.innerHTML = `
            <span>${message.user}</span> - <span>${message.time}</span> :
            <p>${message.data}</p>
        `
        ul.append(li)
    }

    function handleClose(e) {
        console.log('client close', e);
    }

    function handleSend() {
        console.log('client send');
        const value = input.value.trim()
        ws.send(JSON.stringify({
            user: localStorage.getItem('username'),
            time: new Date().getTime(),
            data: value
        }))
    }

}(document))
