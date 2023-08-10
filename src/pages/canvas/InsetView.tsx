import React, { useRef, useEffect } from 'react';

interface CanvasColor {
  color: string;
  percent: number;
}

interface Props {
  width: number;
  height: number;
  text: string;
  backgroundColors: CanvasColor[];
  forgegroundColors: CanvasColor[];
}

function formatColor(color?: string, alpha = 255) {
  const result = [0, 0, 0, 0];
  if (!color) {
    return result;
  }
  if (color[0] === '#') {
    //#fff #ffffff #fffa #ffffffaa
    if (color.length === 4) {
      result[0] = (parseInt(color[1], 16) / 15) * 255;
      result[1] = (parseInt(color[2], 16) / 15) * 255;
      result[2] = (parseInt(color[3], 16) / 15) * 255;
      result[3] = 255;
    } else if (color.length === 5) {
      result[0] = (parseInt(color[1], 16) / 15) * 255;
      result[1] = (parseInt(color[2], 16) / 15) * 255;
      result[2] = (parseInt(color[3], 16) / 15) * 255;
      result[3] = (parseInt(color[4], 16) / 15) * 255;
    } else if (color.length === 7) {
      result[0] = parseInt(color.substring(1, 3), 16);
      result[1] = parseInt(color.substring(3, 5), 16);
      result[2] = parseInt(color.substring(5, 7), 16);
      result[3] = 255;
    } else if (color.length === 9) {
      result[0] = parseInt(color.substring(1, 3), 16);
      result[1] = parseInt(color.substring(3, 5), 16);
      result[2] = parseInt(color.substring(5, 7), 16);
      result[3] = parseInt(color.substring(7, 9), 16);
    }
  } else if (color[0] === 'r') {
    // rgb(0,0,0) rgba(1,2,3,3)
    if (color.startsWith('rgba')) {
      const list = color.substring(5, color.length - 1).split(',');
      result[0] = parseInt(list[0], 10);
      result[1] = parseInt(list[1], 10);
      result[2] = parseInt(list[2], 10);
      result[3] = parseInt(list[3], 10);
    } else if (color.startsWith('rgb')) {
      const list = color.substring(4, color.length - 1).split(',');
      result[0] = parseInt(list[0], 10);
      result[1] = parseInt(list[1], 10);
      result[2] = parseInt(list[2], 10);
      result[3] = 255;
    }
  }
  if (alpha) {
    result[3] = alpha;
  }
  // console.log('format color: input = ', color, ', output = ', result);
  return result;
}

function calInterpolateValue(
  prevStart: number,
  prevEnd: number,
  nextStart: number,
  nextEnd: number,
  accStep: number
) {
  const pd = prevEnd - prevStart;
  const nd = nextEnd - nextStart;
  return nextStart + (accStep / pd) * nd;
}

export default function InsetView(props: Props) {
  const {
    width: CanvasWidth,
    height: CanvasHeight,
    text,
    backgroundColors,
    forgegroundColors,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>();

  const font = '100px Arial';

  function getColor(col: number, total: number, colors: CanvasColor[]) {
    const current = col / total;
    let cursor = 0;
    for (let i = 0; i < colors.length; i += 1) {
      const next = cursor + colors[i].percent;
      if (current >= cursor && current <= next) {
        return colors[i].color;
      }
      cursor = next;
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, CanvasWidth, CanvasHeight);
        
        context.textBaseline = 'middle';
        context.fillStyle = '#000';
        context.font = font;
        context.fillText(text, 0, CanvasHeight / 2, CanvasWidth);
        const width = context.measureText(text).width;

        const imageData = context.getImageData(0, 0, CanvasWidth, CanvasHeight);

        const { data, width: imgWidth, height: imgHeight } = imageData;
        let row = 0;
        let col = 0;
        const delta: number[] = [];
        // 包含以 RGBA 顺序的数据
        console.log('image data Uint8ClampedArray: ', data.length);

        const updateImageData = (index: number, value: number) => {
          // if (index >= 4 * imgWidth * 110 && index < 4 * imgWidth * 111) {
          //   console.log(`index:${index}, value:${value}`);
          // }
          imageData.data[index] = value;
        };

        const backgroundValue = 255;
        const forgegroundValue = 0;
        let targetBackgroundValue = 0;
        let targetForgegroundValue = 0;
        const [lastR, lastG, lastB, lastA] = data;
        const lastValues = [lastR, lastG, lastB, lastA];
        const accValues = [0, 0, 0, 0];

        for (let i = 0; i < data.length; i += 1) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          const targetBackground = getColor(col, imgWidth, backgroundColors);
          const targetForgeground = getColor(col, imgWidth, forgegroundColors);

          const bgc = formatColor(targetBackground);
          const fgc = formatColor(targetForgeground);

          const value = data[i];
          if (i % 4 === 3) {
            col += 1;
            // A
            // updateImageData(i, 255)
            if (col === imgWidth) {
              // if (row === 110) {
              //   console.log('row data: ', rowData);
              //   const newRow = handleRowData(
              //     rowData,
              //     targetBackground,
              //     targetForgeground
              //   );
              //   console.log('new row: ', newRow);
              // }
              row += 1;
              col = 0;
            }
            // continue;
          }
          let delta = 0;
          const accValue = 0;

          const j = i % 4;
          targetBackgroundValue = bgc[j];
          targetForgegroundValue = fgc[j];
          delta = value - lastValues[j];

          if (delta === 0) {
            accValues[j] = 0;
            if (value === forgegroundValue) {
              updateImageData(i, targetForgegroundValue);
            } else if (value === backgroundValue) {
              updateImageData(i, targetBackgroundValue);
            } else {
              console.log(`row: ${row}, col: ${col}, index: ${i}`);
              console.log('value is not forgeground or background: ', value);
            }
          } else {
            accValues[j] += delta;
            const nextValue =
              delta > 0
                ? calInterpolateValue(
                    forgegroundValue,
                    backgroundValue,
                    targetForgegroundValue,
                    targetBackgroundValue,
                    accValues[j]
                  )
                : calInterpolateValue(
                    backgroundValue,
                    forgegroundValue,
                    targetBackgroundValue,
                    targetForgegroundValue,
                    accValues[j]
                  );
            if (row === 110) {
              console.log(
                `row: ${row}, col: ${col}, delta: ${delta}, acc value: ${accValue}
              ${forgegroundValue} -> ${backgroundValue}, 
              target: ${targetForgegroundValue} -> ${targetBackgroundValue}，
              current: ${value} -> ${nextValue}`
              );
            }
            updateImageData(i, nextValue);
          }
        }

        context.putImageData(imageData, 0, 0);
      }
    }
  }, []);

  return (
    <canvas
      ref={(ref) => {
        canvasRef.current = ref;
      }}
      width={CanvasWidth}
      height={CanvasHeight}
    />
  );
}
