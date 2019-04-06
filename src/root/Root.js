import React from 'react';
import { Provider } from 'react-redux';
import App from "../App";


class Root extends React.Component {
    render() {
        return (
          <Provider>
              <App />
          </Provider>
        );
    }
}