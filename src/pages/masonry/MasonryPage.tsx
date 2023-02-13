/*
 * @Author: zhengweibin zhengweibin-a0925@aqara.com
 * @Date: 2022-06-11 21:56:52
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @LastEditTime: 2022-06-11 21:58:14
 * @FilePath: /react-mobile/src/pages/masonry/MasonryPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from '@mui/material';

import MasonryView from '../../components/MasonryView';

type IData = {
  color: string;
  width: number;
  height: number;
};

function generateRandomRect() {
  const width = Math.floor(Math.random() * 10 + 5) * 100;
  const height = Math.floor(Math.random() * 10 + 5) * 200;
  return { width, height };
}

function randomColor() {
  const colors = [
    '#ff0000',
    '#fbb034',
    '#ffdd00',
    '#c1d82f',
    '#00a4e4',
    '#8a7967',
  ];

  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function MasonryPage() {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const l: IData[] = [];
    for (let i = 0; i < 30; i += 1) {
      const nextRect = generateRandomRect();
      const color = randomColor();
      const item = { ...nextRect, color };
      l.push(item);
    }
    setData(l);
  }, []);

  const onAdd = useCallback(() => {
    const nextRect = generateRandomRect();
    const color = randomColor();
    const item = { ...nextRect, color };
    setData((old) => {
      const array = Array.from(old);
      array.push(item);
      return array;
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Button variant="contained" onClick={onAdd}>
        Add
      </Button>
      <MasonryView
        style={{
          width: '100%',
        }}
        list={data}
        renderItem={(index) => {
          const item = data[index];
          return (
            <div
              style={{
                backgroundColor: item.color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 1,
                // borderStyle: 'solid',
              }}
            >
              <span style={{ color: 'white', fontSize: 35 }}>{index + 1}</span>
            </div>
          );
        }}
      />
      {/* <div style={{ width: '100%', height: 400, overflowY: 'scroll' }}></div> */}
    </div>
  );
}

export default MasonryPage;
