import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

import styles from './sidemenu.module.scss';
import homeStyles from './homepage.module.scss';
import Routers from '../../constants/Routers';

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
  const navigate = useNavigate();

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

  useEffect(() => {
    // console.log('path name from side menu : ', navigat);
  }, []);

  return (
    <animated.div style={style} className={styles.root}>
      <div className={styles.title_row}>
        <p className={styles.title}>Side Menu</p>
        <span onClick={onRequestClose}>close</span>
      </div>
      <div
        onClick={() => {
          navigate(`${Routers.HomePage}/home1`);
          onRequestClose();
        }}
        style={{
          alignItems: 'flex-start',
        }}
        className={`${homeStyles.tab} ${homeStyles.tab_common}`}
      >
        Getting Start
      </div>
      <div
        onClick={() => {
          navigate(`${Routers.HomePage}/home2`);
          onRequestClose();
        }}
        style={{
          alignItems: 'flex-start',
        }}
        className={`${homeStyles.tab} ${homeStyles.tab_common}`}
      >
        Tutorial
      </div>
    </animated.div>
  );
}
