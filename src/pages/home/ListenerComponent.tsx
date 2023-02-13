/*
 * @Author: your name
 * @Date: 2021-12-30 21:10:31
 * @LastEditTime: 2021-12-30 21:19:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /react-mobile/src/pages/home/ListenerComponent.tsx
 */
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@mui/material';

import { setHomeStatus } from '../../actions/HomeDataAction';

type Callback = (num: number) => void;

const Listeners: Callback[] = [];

export const addListener = (callback: Callback) => {
  if (Listeners.indexOf(callback) < 0) {
    Listeners.push(callback);
  }
};

const ListenerComponent = () => {
  const count = useRef(0);
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          count.current += 1;
          console.log('Listener length = ', Listeners.length);
          Listeners.forEach((c) => {
            c(count.current);
          });

          dispatch(setHomeStatus(count.current));
        }}
      >
        Fire
      </Button>
    </div>
  );
};

export default ListenerComponent;
