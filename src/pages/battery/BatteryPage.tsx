import React, { useEffect, useState, useRef } from 'react';
import { Button, Table, Select, Space } from 'antd';
import { Line } from '@ant-design/charts';
import type { SelectProps } from 'antd';

import styles from './batterypage.module.scss';
import ChargeText1 from '../../assets/text/charge1.txt';
import TimeUtils from '../../utils/TimeUtils';

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

type SelectOption = Required<SelectProps>['options'][number];

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

type IMonthSection = {
  year: number;
  month: number;
  startIndex: number;
  endIndex: number;
};

type IYearSection = {
  year: number;
  monthList: IMonthSection[];
};

const TableColums = [
  {
    key: 'speed',
    dataIndex: 'speed',
    title: '充电速度',
  },
  {
    key: 'duration',
    dataIndex: 'duration',
    title: '时长',
  },
  {
    key: 'startValue',
    dataIndex: 'startValue',
    title: '开始值',
  },
  {
    key: 'endValue',
    dataIndex: 'endValue',
    title: '完成值',
  },
  {
    key: 'startTime',
    dataIndex: 'startTime',
    title: '开始时间',
  },
  {
    key: 'endTime',
    dataIndex: 'endTime',
    title: '结束时间',
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: '地址',
  },
];

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

  const chargeYearSectionList: IYearSection[] = [];
  let currentYear = 0;
  let currentMonth = 0;

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
      const index = res.length;

      const { year, month } = TimeUtils.getTimeData(data1.timestamp);
      const section: IMonthSection = {
        year,
        month,
        startIndex: index,
        endIndex: 0,
      };
      if (year !== currentYear || month !== currentMonth) {
        const lastYearSection =
          chargeYearSectionList[chargeYearSectionList.length - 1];
        if (lastYearSection) {
          const lastMonthSection =
            lastYearSection.monthList[lastYearSection.monthList.length - 1];
          if (lastMonthSection.endIndex === 0) {
            lastMonthSection.endIndex = index;
          }
        }
        if (year !== currentYear) {
          chargeYearSectionList.push({
            year,
            monthList: [section],
          });
        } else {
          lastYearSection.monthList.push(section);
        }
        currentYear = year;
        currentMonth = month;
      }

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

  const lastYearSection =
    chargeYearSectionList[chargeYearSectionList.length - 1];
  if (lastYearSection) {
    const lastMonthSection =
      lastYearSection.monthList[lastYearSection.monthList.length - 1];
    if (lastMonthSection.endIndex === 0) {
      lastMonthSection.endIndex = res.length;
    }
  }

  return {
    chargeProcess: res,
    chargeYearSectionList,
  };
};

export default function BatteryPage() {
  const [chargeList, setChargeList] = useState<IChargeProcess[]>([]);

  const [lineChartData, setLineChartData] = useState<IChargeProcess[]>([]);
  const [chargeYearOptions, setChargeYearOptions] = useState<SelectOption[]>(
    []
  );
  const [selectSection, setSelectSection] = useState<IMonthSection>({
    year: 0,
    month: 0,
    startIndex: 0,
    endIndex: 0,
  });
  const [chargeMonthOptions, setChargeMonthOptions] = useState<SelectOption[]>(
    []
  );

  const yearSectionsRef = useRef<IYearSection[]>([]);

  useEffect(() => {
    // const str = '2023年6月9日 10:22';
    // const res = str.matchAll(/(\d+)年(\d+)月(\d+)日 (\d+):(\d+)/g);
    // if (res) {
    //   const array = res.next().value;
    //   const [all, year, month, day, hour, minute] = array;
    //   const date = new Date(year, month - 1, day, hour, minute, 0);
    //   console.log(date.toLocaleString());
    // }
  }, []);

  const initOptions = (sections: IYearSection[]) => {
    const yearOptions: SelectOption[] = [];
    const monthOptions: SelectOption[] = [];

    const [first] = sections;

    sections.forEach((section) => {
      const { year } = section;
      yearOptions.push({
        value: year,
        label: `${year}年`,
      });
    });
    first.monthList.forEach((section) => {
      const { month } = section;
      monthOptions.push({
        value: month,
        label: `${month}月`,
      });
    });

    setSelectSection(first.monthList[0]);
    setChargeYearOptions(yearOptions);
    setChargeMonthOptions(monthOptions);
  };

  const updateMonthOptions = (year: number) => {
    const list = yearSectionsRef.current;
    for (let i = 0; i < list.length; i += 1) {
      const { year: y, monthList } = list[i];
      if (year === y) {
        const monthOptions: SelectOption[] = [];

        monthList.forEach((section) => {
          const { month } = section;
          monthOptions.push({
            value: month,
            label: `${month}月`,
          });
        });
        setChargeMonthOptions(monthOptions);
        setSelectSection(monthList[0]);
        break;
      }
    }
  };

  useEffect(() => {
    const { startIndex, endIndex } = selectSection;
    setLineChartData(chargeList.slice(startIndex, endIndex));
  }, [chargeList, selectSection]);

  return (
    <div>
      <div className={styles.top_header}>
        <Button
          className={styles.load_local_data_button}
          onClick={() => {
            const list = convertChargeDataList(ChargeText1);
            console.log('charge data list: ', list);
            list.reverse();
            const result = convertList2ChargeProcess(list);
            console.log('charge process: ', result);
            setChargeList(result.chargeProcess);
            initOptions(result.chargeYearSectionList);
            yearSectionsRef.current = result.chargeYearSectionList;
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
                      const { chargeProcess } = convertList2ChargeProcess(list);
                      // console.log(charge);
                      setChargeList(chargeProcess);
                    }
                  };
                  reader.readAsText(file); // 以文本格式读取文件内容
                }
              }
            }}
          />
          <span>选择文件</span>
        </div>
      </div>

      <Space className={styles.selector_row} size={20}>
        <Select
          defaultValue={selectSection.year}
          className={styles.select}
          value={selectSection.year}
          options={chargeYearOptions}
          onChange={(value) => {
            updateMonthOptions(value);
          }}
        />
        <Select
          className={styles.select}
          options={chargeMonthOptions}
          defaultValue={selectSection.month}
          value={selectSection.month}
          onChange={(value) => {
            setSelectSection((old) => {
              const { year } = old;
              const list = yearSectionsRef.current;
              let section = old;
              for (let i = 0; i < list.length; i += 1) {
                const { year: y, monthList } = list[i];
                if (year === y) {
                  for (let j = 0; j < monthList.length; j += 1) {
                    const { month } = monthList[j];
                    if (value === month) {
                      section = monthList[j];
                      break;
                    }
                  }
                  break;
                }
              }
              return section;
            });
          }}
        />
      </Space>

      {lineChartData.length ? (
        <Line
          className={styles.line_chart}
          data={lineChartData}
          height={400}
          xField="startTime"
          yField="speed"
          tooltip={{
            fields: [
              'startTime',
              'endTime',
              'startValue',
              'endValue',
              'address',
            ],
          }}
        />
      ) : null}
      {chargeList.length ? (
        <Table
          className={styles.table}
          columns={TableColums}
          dataSource={chargeList}
          rowKey="startTime"
        />
      ) : null}
    </div>
  );
}
