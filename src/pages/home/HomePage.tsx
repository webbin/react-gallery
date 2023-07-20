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
import { Route, Link, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

import Routers from '../../constants/Routers';
import './home.css';
import { addListener } from './ListenerComponent';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import styles from './homepage.module.scss';

interface HomeBtnProps {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function HomeButton(props: HomeBtnProps) {
  const { title, onClick } = props;
  return (
    <Button
      style={{
        display: 'block',
        marginLeft: 10,
        marginRight: 10,
        width: 140,
        height: 80,
        marginTop: 5,
        marginBottom: 10,
        cursor: 'pointer',
      }}
      variant="contained"
      onClick={onClick}
      // title={title}
      // lowerCase
    >
      {title}
    </Button>
  );
}

const HomePage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const status = useAppSelector((store) => store.homeData.homeStatus);
  const statusRef = useRef(status);

  useEffect(() => {
    console.log('use effect -- status --');
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    console.log('use effect');
    addListener(() => {
      console.log(' status = ', statusRef.current);
    });
    return () => {
      console.log('Home page Unmount');
    };
  }, []);

  return (
    <div className={styles.home_text_content}>
      <p className={styles.home_title}>Getting Started with Redux</p>
      <p>Redux is a predictable state container for JavaScript apps.</p>
      <p>
        It helps you write applications that behave consistently, run in
        different environments (client, server, and native), and are easy to
        test. On top of that, it provides a great developer experience, such
        as&nbsp;
        <a href="https://github.com/reduxjs/redux-devtools">
          live code editing combined with a time traveling debugger
        </a>
        .
      </p>
      <p>
        You can use Redux together with&nbsp;
        <a href="https://reactjs.org">React</a>&nbsp;, or with any other view
        library. It is tiny (2kB, including dependencies), but has a large
        ecosystem of addons available.
      </p>

      <p className={styles.home_title}>Installation</p>
      <p className={styles.home_title_v2}>Redux Toolkit</p>
      <p>
        <a href="https://redux-toolkit.js.org">Redux Toolkit</a> is our official
        standard approach for writing Redux logic. It wraps around the Redux
        core, and contains packages and functions that we think are essential
        for building a Redux app. Redux Toolkit builds in our suggested best
        practices, simplifies most Redux tasks, prevents common mistakes, and
        makes it easier to write Redux applications.
      </p>
      <p>
        RTK includes utilities that help simplify many common use cases,
        including&nbsp;
        <a href="https://redux-toolkit.js.org/api/configureStore">
          store setup
        </a>
        &nbsp;,&nbsp;
        <a href="https://redux-toolkit.js.org/api/createreducer">
          creating reducers and writing immutable update logic
        </a>
        &nbsp;, and even&nbsp;
        <a href="https://redux-toolkit.js.org/api/createslice">
          creating entire &quot;slices&quot; of state at once.
        </a>
      </p>
      <p>
        Redux Toolkit is available as a package on NPM for use with a module
        bundler or in a Node application:
      </p>

      <p className={styles.home_title}>Routes</p>
      <ul>
        <li>
          <Link to={Routers.StationPage}>Station Page</Link>
        </li>
        <li>
          <Link to={Routers.TransformPage}>Transform</Link>
        </li>
        <li>
          <Link to={Routers.CanvasPage}>Canvas</Link>
        </li>
        <li>
          <Link to={Routers.WindowPage}>Window</Link>
        </li>
        <li>
          <Link to={Routers.AnimationPage}>Animation</Link>
        </li>
        <li>
          <Link to={Routers.MasonryPage}>Masonry</Link>
        </li>
        <li>
          <Link to={Routers.ColorPage}>Colors</Link>
        </li>
        <li>
          <Link to={Routers.ReactKeyPage}>React Key</Link>
        </li>
        <li>
          <Link to={Routers.AlgorithmPage}>Algorithm</Link>
        </li>
        <li>
          <Link to={Routers.BatteryPage}>iPhone Battery</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
