import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';

import registerServiceWorker from './registerServiceWorker';

const enhancer = applyMiddleware(logger);
const store = createStore(reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
