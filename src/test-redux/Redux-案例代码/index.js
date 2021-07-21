import React from 'react';
import ReactDOM from 'react-dom';
import Count from "./Count";

import store from './store'

const render = ()=> ReactDOM.render(
  <React.StrictMode>
    <Count />
  </React.StrictMode>,
  document.getElementById('root')
);

render()

// 添加一个变化监听器
store.subscribe(render)

