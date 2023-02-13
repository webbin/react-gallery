/*
 * @Author: your name
 * @Date: 2021-06-03 15:33:26
 * @LastEditTime: 2021-06-22 10:45:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/components/buttons/MultiClickButton.tsx
 */
import { Toast, Button } from 'antd-mobile';
import { ButtonProps } from 'antd-mobile/lib/button';
import React, { PureComponent } from 'react';

interface Props extends ButtonProps {
  multiClickTime?: number;
  duration?: number;
  onMultiClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default class MultiClickButton extends PureComponent<Props> {
  // static defaultProps = {
  //   clickCount: 10,
  //   duration: 1500,
  // };

  count = 0;

  timer: number | null = null;

  onClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    this.count += 1;
    const { onMultiClick, multiClickTime = 10, duration = 2000 } = this.props;
    console.log('on multiple click ', this.count);
    if (!this.timer) {
      this.timer = window.setTimeout(() => {
        this.count = 0;
        console.log('multiple click timeout ');
        this.timer = null;
      }, duration);
    }
    if (this.count >= multiClickTime) {
      if (onMultiClick) onMultiClick(event);
      this.clearTimer();
      this.count = 0;
    }
  };

  clearTimer = () => {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    return (
      <Button {...this.props} onClick={this.onClick}>
        {this.props.children}
      </Button>
    );
  }
}
