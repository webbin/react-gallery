/*
 * @Date: 2021-01-21 20:57:56
 * @LastEditTime: 2021-06-17 23:12:07
 * @Author: zhengweibin
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reducers/store';
import App from './pages/main/App';

const Index = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

const root = createRoot(document.getElementById('root') as Element);
root.render(<Index />);
