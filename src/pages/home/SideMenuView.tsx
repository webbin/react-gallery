import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

import styles from './sidemenu.module.scss';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
}

interface AnimationProps {
  // 定义动画效果所需的属性
  transform: string;
}

export default function SideMenuView(prop: Props) {
  const { visible, onRequestClose } = prop;
  const [ts, setTs] = useState('-100%');
  const style = useSpring<AnimationProps>({
    transform: `translateX(${ts})`,
  });
  useEffect(() => {
    if (visible) {
      setTs('0');
    } else {
      setTs('-100%');
    }
  }, [visible]);

  return (
    <animated.div style={style} className={styles.root}>
      <p className={styles.title}>Side Menu</p>
      <span style={{ display: 'inline-block' }} onClick={onRequestClose}>
        close
      </span>
    </animated.div>
  );
}
