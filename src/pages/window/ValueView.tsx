import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';

interface Props {
  value: number;
}

export default function ValueView(props: Props) {
  const { value } = props;
  const [isEven, setIsEven] = useState('unknown');
  const eleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('value view use effect value change ');
    // setIsEven(value % 2 === 0 ? 'yes' : 'no');
    if (eleRef.current) {
      const rect = eleRef.current.getBoundingClientRect();
      console.log('div top: ', rect.top);
    }
  }, [value]);
  useLayoutEffect(() => {
    console.log('value view use layout effect value change ');
    if (eleRef.current) {
      const rect = eleRef.current.getBoundingClientRect();
      console.log('div top: ', rect.top);
    }
  }, [value]);
  // useEffect(() => {
  //   console.log('value view use effect isEven change ');
  // }, [isEven]);
  // useLayoutEffect(() => {
  //   console.log('value view use layout effect isEven change ');
  //   if (isEven === 'yes') {
  //     setIsEven('Yeeeeeeeeees');
  //   }
  // }, [isEven]);

  console.log('value view render', value);
  const prompt = () => {
    console.log('prompt');
  };

  return (
    <div>
      <p>Value View</p>
      {prompt()}
      <span>Value: {value}</span>
      <br></br>
      <span>Even: {isEven}</span>
      <div
        style={{
          background: 'black',
          width: 100,
          height: value,
        }}
      ></div>

      <div
        style={{
          background: '#cfa',
          width: 100,
          height: 100,
        }}
        ref={eleRef}
      ></div>
    </div>
  );
}
