/*
 * @Author: your name
 * @Date: 2021-12-12 11:34:07
 * @LastEditTime: 2021-12-25 16:17:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /react-mobile/src/pages/window/WindowPage.tsx
 */

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { RouteComponentProps } from 'react-router-dom';

import ValueView from './ValueView';
import styles from './window.module.scss';

type Props = RouteComponentProps & {};

const WindowPage = (props: Props) => {
  const widthRef = useRef(window.innerWidth);
  const [count, setCount] = useState(100);
  const [historyState, setHistoryState] = useState('');
  const [user, setUser] = useState({
    name: 'Jake',
    height: 199,
  });

  useEffect(() => {
    // console.log('set count');
    // setCount((old) => old + 1);
  }, []);
  console.log('window page render', count);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 30,
        paddingRight: 30,
      }}
    >
      <ValueView value={count} />
      <Button
        onClick={() => {
          setCount((old) => {
            console.log('on click , old: ', old);
            return old + 100;
          });
        }}
        variant="contained"
      >
        Count Add
      </Button>

      <span>User Name: {user.name}</span>
      <span>User Height: {user.height}</span>
      <Button
        onClick={() => {
          user.name = 'Mike';
          setUser(user);
        }}
        variant="contained"
      >
        Chage User
      </Button>
      <div
        style={{
          paddingTop: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Button
          onClick={() => {
            alert(`now = ${new Date()} -- 1`);
            alert(`now = ${new Date()} -- 2`);
            alert(`now = ${new Date()} -- 3`);
          }}
          variant="contained"
        >
          Alert
        </Button>

        <Button
          className={styles.button}
          variant="contained"
          onClick={() => {
            const res = prompt('Prompt Test', 'test');
            if (res) {
              console.log('prompt result ', res);
            }
          }}
        >
          Prompt
        </Button>
      </div>

      <div
        style={{
          width: '100%',
          height: 100,
          position: 'relative',
          backgroundColor: '#cfa',
          overflowX: 'scroll',
        }}
      >
        <div
          style={{
            width: widthRef.current - 20 - 20,
            height: 350,
            borderStyle: 'solid',
            borderWidth: 10,
            borderColor: 'black',
            backgroundColor: '#09a',
          }}
        ></div>
      </div>
    </div>
  );
};

export default WindowPage;
