import React from 'react';
import { useSpring, animated, useTransition } from 'react-spring';

function ReactSpringPage() {
  const [spring, api] = useSpring(() => {
    return {
      // from: { },
      width: 80,
    };
  });
  return (
    <div>
      ReactSpringPage
      <animated.div
        onMouseEnter={() => {
          
        }}
        onMouseLeave={() => {

        }}
        style={{
          // width: 80,
          height: 80,
          background: '#ff6d6d',
          borderRadius: 8,
          ...spring,
        }}
      />
    </div>
  );
}

export default ReactSpringPage;
