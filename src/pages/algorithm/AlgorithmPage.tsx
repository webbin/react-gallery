import React, { useState, useEffect, useRef } from 'react';

import { Select, Typography, SelectProps } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './algorithmpage.module.scss';
import HtmlPageMap from './HtmlPageMap';

type IRect = { width: number; height: number };
// type IMenuList = MenuProps['items'];

type SelectOptions = SelectProps['options'];

export default function AlgorithmPage() {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [rect, setRect] = useState<IRect>({ width: 0, height: 0 });
  const [menus, setMenus] = useState<SelectOptions>([]);
  const [valueSelected, setValueSelected] = useState('0');
  useEffect(() => {
    setRect({
      width: Math.floor(window.innerWidth) - 10,
      height: Math.floor(window.innerHeight) - 10,
    });
    setMenus(
      Object.keys(HtmlPageMap).map((k) => {
        const v = HtmlPageMap[k];
        const splits = v.split('/');
        return {
          className: styles.select_option,
          key: k,
          label: splits[splits.length - 1].replace('.html', ''),
          // path: v,
          value: k,
        };
      })
    );
    if (frameRef.current) {
      const w = frameRef.current.contentWindow;
      if (w) {
      }
    }
  }, []);

  return (
    <div className={styles.root}>
      {/* <Select
        style={{
          backgroundColor: '#000',
          color: '#eee',
        }}
        className={styles.select}
        value={valueSelected}
        onChange={(e) => {
          console.log('on change ', e.target.value);
          console.log('map value: ', HtmlPageMap[e.target.value]);
          setValueSelected(e.target.value);
        }}
      >
        {menus.map((v) => {
          return (
            <MenuItem
              style={{ maxWidth: rect.width * 0.8 }}
              key={v.key}
              value={v.key}
            >
              {v.name}
            </MenuItem>
          );
        })}
      </Select> */}
      <Select
        className={styles.select}
        options={menus}
        defaultValue={'0'}
        onChange={(value, option) => {
          console.log('on change ', value);
          setValueSelected(value);
        }}
      ></Select>
      <iframe
        onChange={() => {
          console.log('iframe on change');
        }}
        onLoadStart={() => {
          console.log('iframe on load start ');
          if (frameRef.current) {
            const w = frameRef.current.contentWindow;
            if (w) {
              const titleP = w.document.getElementsByClassName('article-title');
              if (titleP) {
                console.log(
                  'on load start , title: ',
                  titleP.item(0)?.textContent
                );
              }
            }
          }
        }}
        onLoad={() => {
          console.log('iframe on load');
          if (frameRef.current) {
            const w = frameRef.current.contentWindow;
            if (w) {
              const p = w.document.getElementsByClassName('x');
              const titleP = w.document.getElementsByClassName('article-title');
              if (p) {
                const e = p.item(0) as HTMLParagraphElement;
                console.log(' p ', e?.textContent);
                if (e) {
                  e.style.display = 'none';
                }
              }
              if (titleP) {
                console.log('title: ', titleP.item(0)?.textContent);
              }
              const rootElement = w.document.getElementById('app');
              if (rootElement) {
                rootElement.style.backgroundColor = '#000';
                const white = '#eee';
                rootElement.style.color = white;
                w.document
                  .querySelectorAll('p, h1, h2, h3, h4, strong, li, .bd')
                  .forEach((ele) => {
                    (ele as HTMLDivElement).style.color = white;
                  });
              }
            }
          }
        }}
        onLoadedData={() => {
          console.log('iframe on loaded data');
        }}
        ref={frameRef}
        className={styles.frame}
        src={HtmlPageMap[valueSelected] || HtmlPageMap[0]}
      />
    </div>
  );
}
