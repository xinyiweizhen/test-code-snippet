import React from 'react';
import ReactDOM from 'react-dom';
import Count from "./Count";
// 从react-redux导入Provider
import { Provider } from 'react-redux'
// 导入store
import store from './store'

const render = ()=> ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Count />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

render()


