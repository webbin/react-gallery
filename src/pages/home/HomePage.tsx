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

import Routers from '../../constants/Routers';
import styles from './homepage.module.scss';
import './home.css';
import { AppStore } from '../../reducers/store';
import { addListener } from './ListenerComponent';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';

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
  }, []);

  return (
    <div
      id="home page"
      style={{
        height: '100vh',
        overflowY: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <HomeButton
          title="Station Page"
          onClick={() => {
            history.push(Routers.StationPage);
          }}
        />
        <HomeButton
          title="Transform"
          onClick={() => {
            history.push(Routers.TransformPage);
          }}
        />
        <HomeButton
          title="Window"
          onClick={() => {
            history.push(Routers.WindowPage);
          }}
        />
        <HomeButton
          title="Animation"
          onClick={() => {
            history.push(Routers.AnimationPage);
          }}
        />

        <HomeButton
          title="Masonry"
          onClick={() => {
            history.push(Routers.MasonryPage);
          }}
        />
        <HomeButton
          title="Colors"
          onClick={() => {
            history.push(Routers.ColorPage);
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
