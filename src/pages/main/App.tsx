/*
 * @Author: weibin.zheng
 * @Date: 2021-02-23 10:38:43
 * @LastEditTime: 2022-06-08 12:03:53
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @Description: content
 * @FilePath: /base-react-webpack-ts/src/App.tsx
 */
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect, ConnectedProps } from 'react-redux';

import './App.css';
import styles from './main.module.scss';
import CanvasPage from '../canvas/CanvasPage';
import HomePage from '../home/HomePage';
import WindowPage from '../window/WindowPage';
import AnimationPage from '../animation/AnimationPage';
import ReactSpringPage from '../animation/ReactSpringPage';
import TransformPage from '../transform/TransformPage';
import ReactKeyPage from '../reactkey/ReactKey';
import MasonryPage from '../masonry/MasonryPage';
import StationPage from '../stations/StationPage';

// import { AppDispatch } from './reducers/store';
import { AppStore } from '../../reducers/store';
import Routers from '../../constants/Routers';

type Props = PropsFromRedux;

function App() {
  // const history = useHistory();
  // const location = useLocation();
  useEffect(() => {
    // window.history
    console.log('location ', location);
    window.addEventListener('hashchange', (e) => {
      console.log('has change', e);
    });
    return () => {
      // second
    };
  }, []);

  return (
    <TransitionGroup id="transition-group" className={styles.transition_group}>
      <CSSTransition
        key={location.pathname}
        classNames={{
          appear: styles.page_appear,
          appearActive: 'my-active-appear',
          appearDone: 'my-done-appear',
          enter: styles.page_enter,
          enterActive: styles.page_enter_active,
          enterDone: styles.page_enter_done,
          exit: styles.page_exit,
          exitActive: styles.page_exit_active,
          exitDone: 'my-done-exit',
        }}
        addEndListener={() => {
          console.log('css transition end ');
        }}
        timeout={1000}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path={Routers.WindowPage}>
              <WindowPage />
            </Route>
            <Route exact path={Routers.AnimationPage}>
              <AnimationPage />
            </Route>
            <Route exact path={Routers.TransformPage}>
              <TransformPage />
            </Route>
            <Route exact path={Routers.ReactKeyPage}>
              <ReactKeyPage />
            </Route>
            <Route path="/canvas">
              <CanvasPage />
            </Route>
            <Route path={Routers.MasonryPage}>
              <MasonryPage />
            </Route>
            <Route path={Routers.ReactSpringPage}>
              <ReactSpringPage />
            </Route>
            <Route path={Routers.StationPage}>
              <StationPage />
            </Route>
          </Switch>
        </Router>
      </CSSTransition>
    </TransitionGroup>
  );
}

const mapStateToProps = (store: AppStore) => {
  return {};
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
