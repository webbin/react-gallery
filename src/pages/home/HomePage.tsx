/*
 * @Author: your name
 * @Date: 2021-05-21 15:25:15
 * @LastEditTime: 2022-06-11 13:32:53
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/pages/HomePage.tsx
 */
import React, { useEffect, useCallback, useRef, useState } from 'react';

import styles from './homepage.module.scss';
import './home.css';
import Colors from './colors.json';

interface IColorItemProps {
  color: string;
}

const isDarkColor = (color: string) => {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  const grayLevel = r * 0.299 + g * 0.587 + b * 0.114;
  return grayLevel <= 192;
};

const ColorItem = (props: IColorItemProps) => {
  const { color } = props;
  return (
    <div
      style={{
        fontSize: 20,
        color: isDarkColor(color) ? 'white' : 'black',
        backgroundColor: color,
        flex: 1,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      {color}
    </div>
  );
};

const HomePage = () => {
  const [grid, setGrid] = useState<string[][]>([]);

  useEffect(() => {
    console.log('home page did mount');
    const colCount = 4;
    let row: string[] = [];
    const res: string[][] = [];
    const set = new Set();
    Colors.forEach((item, colorIndex) => {
      if (set.has(item)) return;
      set.add(item);
      row.push(item);
      const index = set.size;
      if ((index + 1) % colCount === 0 || colorIndex === Colors.length - 1) {
        res.push(row);
        row = [];
      }
    });
    setGrid(res);
  }, []);

  return (
    <div className={styles.container}>
      <div>
        {grid.map((row) => {
          return (
            <div
              key={row[0]}
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {row.map((item) => {
                return <ColorItem color={item} key={item} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
