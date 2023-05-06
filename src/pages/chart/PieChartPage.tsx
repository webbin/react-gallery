import React, { useEffect } from 'react';
import PieChart from './PieChart';

const data = [
  { color: 'red', value: 20, label: 'Red' },
  { color: 'blue', value: 25, label: 'Blue' },
  { color: 'green', value: 40, label: 'Green一个比较长的选项长' },
  { color: 'orange', value: 10, label: 'Orange' },
  { color: 'purple', value: 5, label: '一个比较长的选项长' },
];

export default function PieChartPage() {
  useEffect(() => {
    console.log('pie chart page, history state = ', window.history.state);
    console.log('pie chart page, history length = ', window.history.length);

    return () => {
      console.log(' pie chart page unmount');
    };
  }, []);

  return <PieChart data={data} width={300} height={300} />;
}
