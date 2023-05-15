/*
 * @Author: your name
 * @Date: 2021-10-15 15:54:41
 * @LastEditTime: 2021-10-15 18:23:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/pages/canvas/CanvasPage.tsx
 */
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material';

type Position = {
  x: number;
  y: number;
  rgba: string;
};

const getImageDataIndex = (
  width: number,
  heigth: number,
  x: number,
  y: number
) => {
  let result = 0;
  result += width * 4 * y;
  result += x * 4;
  return result;
};

const CanvasPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [imageBase64, setImageBase64] = useState('');
  const [mousePosition, setMousePosition] = useState<Position>({
    x: -1,
    y: -1,
    rgba: '--',
  });
  const CanvasWidth = 255;
  const CanvasHeight = 255;

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      contextRef.current = context;
      // const image = new Image();
      // image.crossOrigin = 'anonymous';
      // image.width = 200;
      // image.height = 200;
      // image.src =
      //   'https://pic3.zhimg.com/80/v2-b31264500590be89d486c10e7bb178e1_1440w.jpg?source=1940ef5c';
      // image.onload = () => {
      //   if (context) {
      //     context.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);
      //   }
      //   image.style.display = 'none';
      // };
      if (context) {
        const imageData = context.createImageData(CanvasWidth, CanvasHeight);
        let red = 0;
        let green = 0;
        let blue = 0;
        let colorValue = 0;
        for (let i = 0; i < CanvasWidth * CanvasHeight * 4; i += 4) {
          const index = i / 4;
          const col = index % CanvasWidth;
          const row = Math.floor(index / CanvasWidth);
          // red = (colorValue & 0b111111110000000000000000) >> 16;
          // green = (colorValue & 0b000000001111111100000000) >> 8;
          blue = 0;
          imageData.data[i] = red;
          imageData.data[i + 1] = green;
          imageData.data[i + 2] = blue;
          imageData.data[i + 3] = 255;
          colorValue += 1;
          red = col;
          green = row;
        }
        console.log('image data = ', imageData);
        context.putImageData(imageData, 0, 0);
      }
    }
  }, []);

  return (
    <div>
      <p>Canvas</p>
      <div>{`mouse x = ${mousePosition.x}, mouse y = ${mousePosition.y}`}</div>
      <div>{`${mousePosition.rgba}`}</div>
      <canvas
        style={{ marginLeft: 30 }}
        onMouseMove={(event) => {
          const top = event.currentTarget.offsetTop;
          const left = event.currentTarget.offsetLeft;
          const x = event.clientX - left;
          const y = event.clientY - top;
          let rgba = '';
          if (contextRef.current) {
            const { data } = contextRef.current.getImageData(x, y, 1, 1);
            rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3]})`;
          }
          setMousePosition({ x, y, rgba });
        }}
        onMouseLeave={() => {
          setMousePosition({ x: -1, y: -1, rgba: '--' });
        }}
        width={CanvasWidth}
        height={CanvasHeight}
        ref={canvasRef}
      />

      <Button
        style={{ display: 'block' }}
        onClick={() => {
          if (contextRef.current) {
            const data = contextRef.current.canvas.toDataURL('image/jpeg', 1);
            setImageBase64(data);
          }
        }}
        variant="contained"
      >
        Generate
      </Button>
      <span style={{ wordBreak: 'break-all', display: 'block' }}>
        {imageBase64}
      </span>
    </div>
  );
};

export default CanvasPage;
