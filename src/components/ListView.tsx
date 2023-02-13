/*
 * @Author: your name
 * @Date: 2021-06-09 11:38:37
 * @LastEditTime: 2021-06-19 17:11:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/components/ListView.tsx
 */
import React, { PureComponent } from 'react';

interface Props<T> {
  style?: React.CSSProperties;
  className?: string | undefined;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  onEndReached: () => void;
  endReachedPixels: number;
}

export default class ListView<T> extends PureComponent<Props<T>> {
  static defaultProps = {
    endReachedPixels: 50,
    onEndReached: () => null,
  };

  oldReachedEndHeight = 0;

  oldDataLength = 0;

  constructor(props: Props<T>) {
    super(props);
    // this.state = {
    // }
  }

  ifInEndArea = (
    scrollTop: number,
    clientHeight: number,
    scrollHeight: number
  ) => {
    const { endReachedPixels = 0 } = this.props;
    const endPx = scrollHeight - endReachedPixels;
    const result = scrollTop + clientHeight >= endPx;
    if (result) {
      console.log('if in end area ? ', result);
    }
    return result;
  };

  onContainerScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const div = event.target as HTMLDivElement;
    const { clientHeight, scrollTop, scrollHeight } = div;
    // console.log(' scroll top = ', scrollTop);
    // console.log(' client height = ', clientHeight);
    // console.log(' offset top = ', div.offsetTop);
    // console.log(' offset height = ', div.offsetHeight);
    // console.log(' scroll height = ', scrollHeight);
    const { onEndReached, data } = this.props;
    if (
      this.ifInEndArea(scrollTop, clientHeight, scrollHeight) &&
      this.oldReachedEndHeight !== scrollHeight &&
      this.oldDataLength !== data.length
    ) {
      console.log('on end reached');
      this.oldReachedEndHeight = scrollHeight;
      this.oldDataLength = data.length;
      onEndReached();
    }
  };

  render() {
    const { style, className, data, renderItem, renderFooter, renderHeader } =
      this.props;
    console.log('render list view , length = ', data.length);
    return (
      <div
        onScroll={this.onContainerScroll}
        style={{ flex: 1, overflowY: 'scroll', ...style }}
        className={className}
      >
        {renderHeader && renderHeader()}
        {data.map(renderItem)}
        {renderFooter && renderFooter()}
      </div>
    );
  }
}
