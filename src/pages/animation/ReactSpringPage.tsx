import React, { useState } from 'react';
import { useSpring, animated, useTransition } from 'react-spring';
import RoleListView from './RoleListView'

interface Props {
  title: string;
  isFirst?: boolean;
  isLast?: boolean;
}

function CardTab(props: Props) {
  const { title } = props;
  const [hovered, setHovered] = useState(0);
  const spring = useSpring({
    width: hovered ? 200 : 150,
    height: hovered ? 80 : 60,
    background: hovered ? '#ffcdd2' : '#ff6d6d',
    config: {
      duration: 200,
    },
  });
  const fontSpring = useSpring({
    fontSize: hovered ? 32 : 24,
    color: hovered ? 'black' : 'white',
    config: {
      duration: 300,
    },
  });

  return (
    <animated.div
      onMouseEnter={() => {
        // console.log('on mouse enter');
        setHovered(1);
      }}
      onMouseLeave={() => {
        // console.log('on mouse leave');
        setHovered(0);
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        ...spring,
      }}
    >
      <animated.span style={{ cursor: 'default', ...fontSpring }}>
        {title}
      </animated.span>
    </animated.div>
  );
}

function FlipCard() {
  const [value, setValue] = useState(0);

  const { transform } = useSpring({
    transform: `perspective(1000px) rotateY(${value * 180}deg)`,
  });
  const { opacity: opacity1 } = useSpring({
    opacity: value % 2 !== 0 ? 0 : 1,
  });
  const { opacity: opacity2 } = useSpring({
    opacity: value % 2 !== 0 ? 1 : 0,
  });
  const width = 576;
  const height = 360;
  return (
    <animated.div
      style={{
        marginTop: 10,
        marginLeft: 10,
        width,
        height,
        position: 'relative',
        borderRadius: 6,
        overflow: 'hidden',
        transform,
      }}
      onClick={(event) => {
        setValue((old) => {
          const { offsetX } = event.nativeEvent;
          console.log('offset x: ', offsetX);

          const flipped = value % 2 !== 0;
          if (flipped) {
            if (offsetX > width / 2) {
              return old - 1;
            }
            return old + 1;
          }
          if (offsetX > width / 2) {
            return old + 1;
          }
          return old - 1;
        });
      }}
    >
      <animated.img
        style={{
          width,
          height,
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: opacity2,
          rotateY: '180deg',
        }}
        src={require('./img_2.jpg')}
      />
      <animated.img
        style={{
          width,
          height,
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: opacity1,
        }}
        src={require('./img_1.jpeg')}
      />
    </animated.div>
  );
}

function ReactSpringPage() {
  return (
    <div>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'flex-end',
          height: 100,
        }}
      >
        <CardTab title="Home" />
        <CardTab title="Data" />
        <CardTab title="Animation" />
      </div>

      <FlipCard />
      <RoleListView />
    </div>
  );
}

export default ReactSpringPage;
