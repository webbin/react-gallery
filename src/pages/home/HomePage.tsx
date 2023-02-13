/*
 * @Author: your name
 * @Date: 2021-05-21 15:25:15
 * @LastEditTime: 2022-06-11 13:32:53
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/pages/HomePage.tsx
 */
import React, { useEffect, useCallback, useRef, useState } from 'react';
// import { Button, Drawer } from 'antd-mobile';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Routers from '../../constants/Routers';
import styles from './homepage.module.scss';
import './home.css';
import { AppStore } from '../../reducers/store';
import { addListener } from './ListenerComponent';
import ListenerComponent from './ListenerComponent';

const renderButton = (
  title: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
) => {
  return (
    <Button
      style={{ marginTop: 20, display: 'block' }}
      variant="contained"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector<AppStore, number>(
    (store) => store.HomeData.homeStatus
  );
  const statusRef = useRef(status);
  const [buttonVisible, setButtonVisible] = useState(true);

  // const listener = useCallback(() => {
  //   console.log('home status = ', status);
  // }, [status]);
  useEffect(() => {
    console.log('use effect -- status --');
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    console.log('use effect');
    addListener(() => {
      console.log(' status = ', statusRef.current);
    });
  }, []);

  return (
    <div
      id="home page"
      style={{
        height: '100vh',
        overflowY: 'hidden',
      }}
    >
      <div style={{ width: 100, height: 100 }}>
        <div
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            backgroundColor: 'rgba(0,0,0,.6)',
            top: 10,
            transform: buttonVisible ? 'translateX(100px)' : undefined,
            transition: 'transform 500ms',
          }}
        ></div>
      </div>
      <div>Home Status = {status}</div>
      <ListenerComponent />

      <div style={{ marginTop: 40 }}>
        {renderButton('Transform', () => {
          history.push(Routers.TransformPage);
        })}
        {renderButton('Window', () => {
          history.push(Routers.WindowPage);
        })}
        {renderButton('Animation', () => {
          history.push(Routers.AnimationPage);
        })}
        {renderButton('React Key', () => {
          history.push(Routers.ReactKeyPage);
        })}
        {renderButton('Button Visible', () => {
          setButtonVisible((old) => !old);
        })}
        {renderButton('Masonry', () => {
          history.push(Routers.MasonryPage)
        })}
      </div>
      <CSSTransition
        // in={buttonVisible}
        id="css transition"
        // classNames="dialog"
        classNames={{
          // enter: 'dialog-enter',
          // enterActive: 'dialog-enter-active',
          // exit: 'dialog-exit',
          // exitActive: 'dialog-exit-active'
          enter: styles.button_enter,
          enterActive: styles.button_enter_active,
          // enterDone: styles.button_enter_done,
          exit: styles.button_exit,
          exitActive: styles.button_exit_active,
          exitDone: styles.button_exit_done,
        }}
        addEndListener={() => {
          console.log('home page css transition end');
        }}
        timeout={1000}
      >
        <div className={styles.container}>
          <div className="orange_button">Button</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default HomePage;
