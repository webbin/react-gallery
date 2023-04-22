import React, { useEffect, useState, useRef, useCallback } from 'react';

import { IPosition } from './types';

interface Props {
  speed?: number;
  rate?: number;
  name: string;
  position: IPosition;
  initialCount?: number;
}

export default function StationView(props: Props) {
  const { speed = 1, name, position, initialCount = 0, rate = 1 } = props;
  const [count, setCount] = useState(initialCount);

  const timerRef = useRef<NodeJS.Timer>();

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCount((prev) => prev + speed);
    }, 1000);
  }, [speed]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
        borderColor: '#000c',
        borderStyle: 'solid',
      }}
    >
      <span style={{ fontSize: 30, color: 'black' }}>{name}</span>
      <span style={{ fontSize: 18, color: '#22a' }}>Count:{count}</span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button
          onClick={() => {
            stopTimer();
            setCount(0);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
