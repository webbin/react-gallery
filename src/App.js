import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import MockBrowser from './component/MockBrowser';
import Root from './root/Root';
import './test/HelloTom';

class App extends Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const offTime = new Date();
    offTime.setHours(17, 30, 0);
    this.offWorkTime = offTime.getTime();

    this.state = {
      result: '',
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      countDown: this.getCountDown(),

      value: 100,
    };

    this.color = 'yellow';
  }

  getCountDown = () => {
    const date = new Date();

    const currentTime = date.getTime();
    const delta = Math.ceil((this.offWorkTime - currentTime) / 1000);
    let countDown = { hour: 0, minute: 0, second: 0 };
    if (delta > 0) {
      const h = Math.floor(delta / 3600);
      const min = Math.floor((delta - h * 3600) / 60);
      const sec = Math.floor(delta - h * 3600 - min * 60);
      countDown = {
        hour: h,
        minute: min,
        second: sec,
      };
    } else {
      countDown = null;
    }

    return countDown;
  };

  componentDidMount() {
  }

  renderCountDown = () => (
    <div>
      <h1 className='off-work-title'>距离下班还有</h1>
      <h1 className='count-down-text'>
        {this.state.countDown.hour}小时{this.state.countDown.minute}分钟
        {this.state.countDown.second}秒
      </h1>
    </div>
  );

  render() {
    return (
      <div className='App'>
        <MockBrowser />
        <Switch>
          <Route path='/main' component={Root} />
          <Redirect to='/main' />
        </Switch>
      </div>
    );
  }
}

export default App;
