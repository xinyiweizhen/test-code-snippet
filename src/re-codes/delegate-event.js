




const ul = document.getElementById('ul')

/**
 * 常规写法
 *  bug: 当li包裹了span,当你点击span的话就会出现问题
 *  [Element.matches()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches)
 */
ul.addEventListener('click', (e)=>{
    if(e.target.matches('li')){
        console.log('成功代理了');
    }
})


/**
 * 事件代理封装函数
 *
 *  [Element.matches()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches)
 *
 * @param rootSelector {Element} 父元素
 * @param delegateElement {String} 代理元素 css选择器字符串
 * @param eventType {GlobalEventHandlersEventMap} 代理事件类型
 * @param fn {Function} 代理事件
 * @returns {*}
 */
function delegate(rootSelector,  delegateElement, eventType, fn) {
    rootSelector.addEventListener(eventType, e =>{
        let target = e.target;
        while(!target.matches(delegateElement)){
            if(rootSelector === target){
                target = null;
                break;
            }
            target = target.parentNode
        }
        target && fn.apply(target, [e, target])
    }, true)
    return rootSelector
}

delegate(ul, 'li', 'click', (e)=>{
    console.log('点击了li', e);
})
