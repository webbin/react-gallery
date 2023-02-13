/*
 * @Author: your name
 * @Date: 2021-08-10 15:36:14
 * @LastEditTime: 2021-08-10 18:16:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/pages/playground/DialogModal.tsx
 */
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onDismiss: () => void;
  visible: boolean;
}

const DialogModal = (props: Props) => {
  const transitionTimingFunction = 'cubic-bezier(.58,.25,.39,1.39)';

  const { onDismiss, visible } = props;
  const [bgColor, setBgColor] = useState('transparent');
  // const [viewVisible, setViewVisible] = useState(false);
  const [dialogScale, setDialogScale] = useState(0.7);
  const isAnimating = useRef(false);

  useEffect(() => {
    // effect
    if (visible) {
      // setViewVisible(true);
      isAnimating.current = true;
      setBgColor('rgba(0,0,0,.2)');
      setDialogScale(1);
    } else {
      isAnimating.current = true;
      setBgColor('transparent');
      setDialogScale(0.7);
    }
    return () => {
      // cleanup
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        transitionProperty: 'all',
        transitionDuration: '1000ms',
      }}
      onClick={() => {
        console.log('modal on click ', isAnimating.current);
        if (isAnimating.current) {
          return;
        }
        isAnimating.current = true;
        setBgColor('transparent');
        setDialogScale(0.7);
        setTimeout(() => {
          onDismiss();
        }, 1000);
      }}
    >
      <div
        onTransitionEnd={() => {
          isAnimating.current = false;
          // if (!visible) setViewVisible(false);
          console.log('on transition end');
        }}
        style={{
          width: 200,
          height: 310,
          backgroundColor: '#cfa',
          borderRadius: 20,
          justifyContent: 'center',
          justifySelf: 'center',
          alignItems: 'center',
          transitionProperty: 'all',
          transitionDuration: '1000ms',
          transform: `scale(${dialogScale}, ${dialogScale})`,
          transitionTimingFunction,
          MozTransitionTimingFunction: transitionTimingFunction,
          WebkitTransitionTimingFunction: transitionTimingFunction,
          msTransitionTimingFunction: transitionTimingFunction,
        }}
      >
        <span>Card Dialog</span>
      </div>
    </div>
  );
};

export default DialogModal;
