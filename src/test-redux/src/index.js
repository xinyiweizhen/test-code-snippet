import React from 'react';
import ReactDOM from 'react-dom';
import Count from "./Count";

import { Provider } from 'react-redux'

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


