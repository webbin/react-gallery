import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

import styles from './batterypage.module.scss';
import data from '../../assets/text/charge1.txt';

// 时间：2023年6月9日 10:22
// 位置：中国
// 广东省
// 深圳市 南山区
// 中山园路103号
// 电量：88

type IChargeData = {
  time: string;
  timestamp: number;
  address: string;
  value: number;
};

const parseTimestamp = (str: string): number => {
  const res = str.matchAll(/(\d+)年(\d+)月(\d+)日 (\d+):(\d+)/g);
  if (res) {
    const array = res.next().value;
    const [all, year, month, day, hour, minute] = array;
    const date = new Date(year, month - 1, day, hour, minute, 0);
    // console.log(date.toLocaleString());
    return date.getTime();
  }
  return 0;
};

const convertChargeData = (input: string): IChargeData => {
  const splits = input.replace(/\n/g, '').split('：');
  const [k1, v1k2, v2k3, v3] = splits;
  const time = v1k2.slice(0, v1k2.length - 2);
  const address = v2k3.slice(0, v2k3.length - 2);
  const value = parseInt(v3, 10);
  return {
    time,
    address,
    value,
    timestamp: parseTimestamp(time),
  };
};

type IChargeProcess = {
  address: string;
  startTime: string;
  endTime: string;
  startTimestamp: number;
  endTimestamp: number;
  startValue: number;
  endValue: number;
  speed: number;
  duration: number;
};

const convertChargeDataList = (str: string) => {
  const separator = '----------------';
  const splits = str.split(separator);
  // console.log(splits.length);
  // console.log(splits[1]);
  const res: IChargeData[] = [];
  splits.forEach((item) => {
    if (item) {
      const data = convertChargeData(item);
      res.push(data);
    }
  });
  return res;
};

const convertList2ChargeProcess = (list: IChargeData[]) => {
  const res: IChargeProcess[] = [];
  for (let i = 0; i < list.length; ) {
    const data1 = list[i];
    if (data1.value === 100) {
      i += 1;
      continue;
    }

    const nextIndex = i + 1;
    const data2 = list[nextIndex];

    // console.log(step);
    if (data1 && data2 && data2.value > data1.value) {
      const duration = data2.timestamp - data1.timestamp;
      const delta = data2.value - data1.value;
      // 每小时的速度
      const speed = (delta / (duration / 1000)) * 3600;

      // console.log('data1: ', data1);
      // console.log('data2: ', data2);
      res.push({
        address: data2.address,
        startTime: data1.time,
        endTime: data2.time,
        startTimestamp: data1.timestamp,
        endTimestamp: data2.timestamp,
        startValue: data1.value,
        endValue: data2.value,
        speed,
        duration: duration / 1000,
      });
      i += 2;
    } else {
      i += 1;
    }
  }
  return res;
};

export default function BatteryPage() {
  const [chargeList, setChargeList] = useState<IChargeProcess[]>([]);

  useEffect(() => {
    const str = '2023年6月9日 10:22';
    const res = str.matchAll(/(\d+)年(\d+)月(\d+)日 (\d+):(\d+)/g);
    if (res) {
      const array = res.next().value;
      const [all, year, month, day, hour, minute] = array;
      const date = new Date(year, month - 1, day, hour, minute, 0);
      console.log(date.toLocaleString());
    }
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          console.log(data.length);
        }}
      >
        Load Local Data
      </Button>
      <div className={styles.upload_button}>
        <input
          className={styles.input}
          type="file"
          onChange={(e) => {
            const { files } = e.target;
            if (files && files.length) {
              const file = files.item(0);
              if (file) {
                console.log('read file: ', file.name);
                console.log('read file size: ', file.size);

                const reader = new FileReader(); // 创建一个FileReader对象

                reader.onload = function (event) {
                  const contents = event.target?.result; // 读取文件内容
                  // alert('文件内容：' + contents);
                  // console.log(contents);
                  if (contents) {
                    const str = contents.toString();
                    const list = convertChargeDataList(str);
                    list.reverse();
                    console.log('charge data list length: ', list.length);

                    // const sm = list.slice(0, 30);
                    // console.log(sm);
                    const charge = convertList2ChargeProcess(list);
                    // console.log(charge);
                    setChargeList(charge);
                  }
                };
                reader.readAsText(file); // 以文本格式读取文件内容
              }
            }
          }}
        />
        <span>Choose File</span>
      </div>
      {chargeList.length ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Head1</th>
              <th>Head2</th>
              <th>Head3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>item1</td>
              <td>item2</td>
            </tr>
            <tr>
              <td>item1</td>
              <td>item2</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
