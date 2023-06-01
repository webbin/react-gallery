/*
 * @Author: weibin.zheng
 * @Date: 2021-02-23 10:38:43
 * @LastEditTime: 2022-06-08 12:03:53
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @Description: content
 * @FilePath: /base-react-webpack-ts/src/App.tsx
 */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.css';
import styles from './main.module.scss';

import { RouterList } from '../../constants/Routers';
import { setWindowType } from '../../reducers/actions';
import { IWindowType } from '../../reducers/types';
import { useAppDispatch } from '../../reducers/hooks';

// type Props = PropsFromRedux;

let windowSizeType: IWindowType;
const MIN_WIDTH = 420;

function App() {
  // const history = useHistory();
  // const location = useLocation();
  const dispath = useAppDispatch();

  useEffect(() => {
    // window.history
    console.log('location ', location);
    window.addEventListener('hashchange', (e) => {
      console.log('has change', e);
    });
    windowSizeType = window.innerWidth > MIN_WIDTH ? 'Large' : 'Small';
    dispath(setWindowType(windowSizeType));
    
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // console.log(' window resize, width: ', width, ', height: ', height);
      if (!windowSizeType) {
        windowSizeType = width > MIN_WIDTH ? 'Large' : 'Small';
        dispath(setWindowType(windowSizeType));
      } else {
        const newType = width > MIN_WIDTH ? 'Large' : 'Small';
        if (newType !== windowSizeType) {
          windowSizeType = newType;
          dispath(setWindowType(newType));
        }
      }
    });
    return () => {
      console.log('App unmount');
    };
  }, []);

  return (
    <Router>
      <TransitionGroup
      // id="transition-group"
      // className={styles.transition_group}
      >
        <CSSTransition
          key={location.pathname}
          classNames={{
            appear: styles.page_appear,
            // appearActive: 'my-active-appear',
            // appearDone: 'my-done-appear',
            enter: styles.page_enter,
            enterActive: styles.page_enter_active,
            enterDone: styles.page_enter_done,
            // exit: styles.page_exit,
            // exitActive: styles.page_exit_active,
            // exitDone: 'my-done-exit',
          }}
          onEnter={() => {
            console.log('on enter');
          }}
          onEntering={() => {
            console.log('on entering');
          }}
          onEntered={() => {
            console.log('on entered');
          }}
          timeout={1000}
        >
          <Switch>
            {RouterList.map((item) => {
              return (
                <Route
                  key={item.path}
                  component={item.component}
                  exact={item.exact}
                  path={item.path}
                />
              );
            })}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>
  );
}

export default App;
