/*
 * @Author: your name
 * @Date: 2021-05-25 18:13:53
 * @LastEditTime: 2021-06-21 20:24:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/components/UnderlayButton.tsx
 */
import React from 'react';
// import { Button } from 'antd-mobile';
import styles from './buttons.module.scss';

type Props = React.HtmlHTMLAttributes<HTMLDivElement>;

const button = (props: Props): JSX.Element => {
  const { className, onClick, children, ...attrs } = props;
  return (
    <div {...attrs} onClick={onClick} className={`${styles['underlay-button']} ${className}`}>
      {children}
    </div>
  );
};

export default button;
