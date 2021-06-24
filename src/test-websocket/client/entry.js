;(function (document) {
    const input = document.querySelector('#name')
    const button = document.querySelector('#button')

    init()

    function init() {
        bindEvent()
    }

    function bindEvent() {
        button.addEventListener('click', handleButtonClick)
    }

    function handleButtonClick(e) {
        e.stopPropagation()
        const name = input.value
        if(!name)return ;
        // name save to localStorage
        localStorage.setItem('username', name)
        location.href='index.html'
    }

}(document))
