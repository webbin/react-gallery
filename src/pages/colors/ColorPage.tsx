import React, { useState, useEffect, useRef } from 'react';

import { CSSTransition } from 'react-transition-group';

import Colors from './Colors.json';
import styles from './colorpage.module.scss';

interface IColorItemProps {
  color: string;
  onCopyDone: (x: number, y: number) => void;
}

const isDarkColor = (color: string) => {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  const grayLevel = r * 0.299 + g * 0.587 + b * 0.114;
  return grayLevel <= 192;
};

const ColorItem = (props: IColorItemProps) => {
  const { color, onCopyDone } = props;
  return (
    <div
      style={{
        color: isDarkColor(color) ? 'white' : 'black',
        backgroundColor: color,
      }}
      className={styles.color_item}
      onClick={(event) => {
        console.log('color: ', color);
        console.log('client: x ', event.clientX, ' y ', event.clientY);
        onCopyDone(event.clientX, event.clientY);
        // navigator.clipboard
        //   .writeText(color)
        //   .then(() => {
        //     console.log('copy success');
        //   })
        //   .catch((err) => {
        //     console.log('copy failed ', err);
        //   });
      }}
    >
      {color}
    </div>
  );
};

interface IBubblePosition {
  x: number;
  y: number;
}

const ColorPage = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [bubblePosition, setBubblePosition] = useState<IBubblePosition>();
  const [showBubble, setShowBubble] = useState(false);
  const dismissTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    console.log('color page did mount');
    const colCount = 4;
    let row: string[] = [];
    const res: string[][] = [];
    const set = new Set();
    Colors.forEach((item, colorIndex) => {
      if (set.has(item)) return;
      set.add(item);
      row.push(item);
      const index = set.size;
      if (index % colCount === 0 || colorIndex === Colors.length - 1) {
        res.push(row);
        row = [];
      }
    });
    setGrid(res);

    return () => {
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <CSSTransition
        classNames={{
          enter: styles.bubble_enter,
          enterDone: styles.bubble_enter_done,
          exit: styles.bubble_exit,
          exitActive: styles.bubble_exit_active,
        }}
        in={showBubble}
        unmountOnExit
        timeout={300}
        onExited={() => {
          setBubblePosition(undefined);
        }}
      >
        <div
          style={{
            left: bubblePosition?.x,
            top: bubblePosition?.y,
          }}
          className={styles.copy_bubble}
        >
          复制成功
        </div>
      </CSSTransition>
      {grid.map((row) => {
        return (
          <div
            key={row[0]}
            style={{
              display: 'flex',
              flexDirection: 'row',
              zIndex: 0,
            }}
          >
            {row.map((item) => {
              return (
                <ColorItem
                  onCopyDone={(x, y) => {
                    if (dismissTimer.current) {
                      clearTimeout(dismissTimer.current);
                    }
                    setBubblePosition({ x, y });
                    setShowBubble(true);
                    dismissTimer.current = setTimeout(() => {
                      setShowBubble(false);
                    }, 1000);
                  }}
                  color={item}
                  key={item}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ColorPage;
