import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Children,
} from 'react';

type IRect = {
  width: number;
  height: number;
};

type IPosition = {
  left: number;
  top: number;
};

type IMasonryData = {
  position: IPosition;
  rect: IRect;
};

function getMinIndex(list: number[]) {
  const { length } = list;
  let index = 0;
  let min = null;
  for (let i = 0; i < length; i += 1) {
    const value = list[i];
    if (value === 0) {
      index = i;
      break;
    }
    if (min === null) {
      min = value;
      index = i;
    } else if (min > value) {
      min = value;
      index = i;
    }
  }
  return index;
}

function childRectScale(childRect: IRect, childWidth: number): IRect {
  const height = Math.round(childWidth / (childRect.width / childRect.height));
  return { width: childWidth, height };
}

interface IItemData extends IRect {
  key?: string;
}

interface Props {
  list: IItemData[];
  style?: React.CSSProperties;
  columnCount?: number;
  renderItem: (index: number) => JSX.Element;
}

function MasonryView(props: React.PropsWithChildren<Props>) {
  const { columnCount = 5, list, style } = props;
  const heightListRef = useRef<number[]>([]);
  const childWidthRef = useRef(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const [dataList, setDataList] = useState<IMasonryData[]>([]);

  const initHeightList = (count: number) => {
    const init = [];
    for (let i = 0; i < count; i += 1) {
      init.push(0);
    }
    heightListRef.current = init;
  };
  useEffect(() => {
    if (rootRef && rootRef.current) {
      const w = rootRef.current.clientWidth;
      console.log('masonry width ', w);
      setWidth(w);
      const cw = Math.round(w / columnCount);
      childWidthRef.current = cw;
    }
    initHeightList(columnCount);
    return () => {
      // second
    };
  }, []);

  useEffect(() => {
    initHeightList(columnCount);
    const l: IMasonryData[] = [];
    list.forEach((item) => {
      const nextRect = { width: item.width, height: item.height };
      const childRect = childRectScale(nextRect, childWidthRef.current);
      const minIndex = getMinIndex(heightListRef.current);
      const left = minIndex * childWidthRef.current;
      const top = heightListRef.current[minIndex];

      const next: IMasonryData = {
        rect: childRect,
        position: { left, top },
      };
      heightListRef.current[minIndex] = top + childRect.height;
      l.push(next);
    });
    setDataList(l);
    updateRootHeight();
  }, [list, columnCount]);

  const updateRootHeight = () => {
    const maxHeight = Math.max(...heightListRef.current);
    setHeight((old) => {
      if (maxHeight > old) {
        return maxHeight;
      }
      return old;
    });
  };

  return (
    <div ref={rootRef} style={{ ...style, height, position: 'relative' }}>
      {dataList.map((item, index) => {
        const { position, rect } = item;
        const node = props.renderItem(index);
        // console.log('node ', node);
        const isBottomDiv = height === rect.height + position.top;
        const ele: React.FunctionComponentElement<HTMLElement> =
          React.cloneElement(node, {
            style: {
              ...node.props.style,
              position: 'absolute',
              width: rect.width,
              height: rect.height,
              left: position.left,
              top: position.top,
            },
            key: list[index].key || index,
            ref: isBottomDiv
              ? (r: HTMLElement) => {
                  r?.scrollIntoView(false);
                }
              : undefined,
          });
        return ele;
      })}
    </div>
  );
}

export default MasonryView;
