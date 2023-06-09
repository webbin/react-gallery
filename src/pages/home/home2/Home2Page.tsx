import React, { useRef, useCallback, useState } from 'react';

import TimeUtils from '../../../utils/TimeUtils';
import styles from '../homepage.module.scss';

function throttle(func: Function, time: number) {
  let timer: NodeJS.Timeout | null = null;
  let invokeTime = 0;

  return function () {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }
    // @ts-ignore
    // eslint-disable-next-line prefer-rest-params
    const args = [...arguments];
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const waitTime = time - (Date.now() - invokeTime);
    console.log('waite : ', waitTime);
    if (waitTime < 0) {
      func.apply(context, args);
      invokeTime = Date.now();
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
        invokeTime = Date.now();
      }, waitTime);
    }
  };
}

export default function Home2Page() {
  const [list, setList] = useState<string[]>([]);

  const pushTime = useCallback((str: string) => {
    setList((old) => {
      return [...old, str];
    });
  }, []);

  const onclick = useCallback(
    throttle(() => {
      // console.log('click time ', Date.now());
      const { hourString, minuteString, secondString, milliseconds } =
        TimeUtils.getTimeData(Date.now());
      pushTime(`${hourString}:${minuteString}:${secondString}.${milliseconds}`);
    }, 1000),
    []
  );

  return (
    <div style={{ flex: 1 }}>
      <div className={styles.home_text_content}>
        <p className={styles.home_title}>Configuring Your Store</p>
        <button
          onClick={() => {
            setList([]);
          }}
        >
          Clear
        </button>
        <button onClick={onclick}>Throttle</button>
      </div>

      <div>
        {list.map((v) => (
          <span className={styles.home2_item} key={v}>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}
