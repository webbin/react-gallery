/*
 * @Author: zhengweibin zhengweibin-a0925@aqara.com
 * @Date: 2022-05-06 16:30:07
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @LastEditTime: 2022-06-08 14:56:17
 * @FilePath: /react-mobile/src/pages/transform/TransformPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';

import styles from './transformpage.module.scss';

function Present() {
  return (
    <div
      style={{
        width: 400,
        height: 200,
        backgroundColor: '#ccc',
        // marginTop: 100,
        // marginLeft: 100,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className={styles.top_cover}></div>
      <div
        className={styles.banner}
        style={{
          width: 282,
          height: 30,
          backgroundColor: '#fac',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 28,
          }}
        >
          banner
        </span>
      </div>
    </div>
  );
}

type ICell = {
  id: string;
  text: string;
  value: number;
};

const COLOR = ['#ccf', '#ccc'];

function CellItem(props: { data: ICell }) {
  const [offsetX, setOffsetX] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const { value, text } = props.data;
  const color = COLOR[value % 2];
  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      isDragging.current = true;
      startX.current = event.pageX;
    },
    []
  );
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (isDragging.current) {
        // console.log('mouse move ', event);
        let distance = event.pageX - startX.current;
        if (distance < 0) {
          distance = Math.max(distance, -50);
        } else {
          distance = Math.min(distance, 50);
        }
        // console.log('mouse move distance ', distance);
        setOffsetX(distance);
      }
      event.stopPropagation();
    },
    []
  );
  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      isDragging.current = false;
      event.stopPropagation();
      startX.current = 0;
      setOffsetX(0);
    },
    []
  );
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={styles.cell}
      style={{
        backgroundColor: color,
        transform: `translate(${offsetX}px, 0)`,
      }}
    >
      <span className={styles.cell_text}>{text}</span>
    </div>
  );
}

function TransformPage() {
  const [list, setList] = useState<ICell[]>([]);

  useEffect(() => {
    const now = Date.now();
    const res: ICell[] = [];
    for (let i = 0; i < 22; i += 1) {
      res.push({ value: now + i, id: `${now}+${i}`, text: `${now} - ${i}` });
    }
    setList(res);
    return () => {
      // second
    };
  }, []);

  return (
    <div className={styles.root}>
      {/* <div className={styles.banner_container}>
        <Present />
      </div> */}

      {list.map((value) => {
        return <CellItem key={value.id} data={value} />;
      })}
    </div>
  );
}

export default TransformPage;
