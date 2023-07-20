/*
 * @Author: zhengweibin zhengweibin-a0925@aqara.com
 * @Date: 2022-05-21 15:27:10
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @LastEditTime: 2022-05-23 14:42:00
 * @FilePath: /react-mobile/src/pages/reactkey/ReactKey.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useState, useEffect, memo } from 'react';
import { Button } from '@mui/material';

interface ItemData {
  key: string;
  content: string;
  color?: string;
}

interface ItemProp {
  data: ItemData;
}
function ListItem(props: ItemProp) {
  const { data: item } = props;
  useEffect(() => {
    console.log(item.key, 'item did mount');
    return () => {
      console.log(item.key, 'item unmount');
    };
  }, []);

  console.log('render list item ', item.content);

  return (
    <div>
      <span
        style={{
          borderRadius: 10,
          padding: 30,
          fontSize: 40,
          marginBottom: 10,
        }}
      >
        {item.content}
      </span>
    </div>
  );
}

const MemoListItem = memo(ListItem);
const OriginList = [
  { key: 'a', content: 'aaa' },
  { key: 'b', content: 'bbb' },
  { key: 'c', content: 'ccc' },
  { key: 'd', content: 'ddd' },
];

function ReactKey() {
  const [list, setList] = useState<ItemData[]>(OriginList);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          // const key = 'my Symbol';
          // const s1 = Symbol.for(key);
          // const s2 = Symbol.for(key);
          // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // // @ts-ignore
          // console.log('s1 = ? s2 ', s1 === s2);
          // setTimeout(function () {
          //   console.log('function set timeout ', this);
          // }, 2000);
        }}
      >
        Div
      </Button>
      <button
        id="butt"
        onClick={() => {
          console.log('on click ');
        }}
      >
        test Symbol
      </button>
      <Button
        variant="contained"
        onClick={() => {
          setList(OriginList);
        }}
      >
        Revert
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setList((old) => {
            const next = Array.from(old);
            next.splice(3, 1);
            next[0] = { key: 'a', content: '-a' };
            return next;
          });
        }}
      >
        change A Content
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          setList((old) => {
            const next = Array.from(old);
            next[0] = { key: '-a', content: '-a' };
            return next;
          });
        }}
      >
        change A Key
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          setList((old) => {
            const next = Array.from(old);
            next.reverse();
            return next;
          });
        }}
      >
        Change Order
      </Button>

      <div>
        {list.map((item) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <ListItem
              // key={item.key}
              data={item}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ReactKey;
