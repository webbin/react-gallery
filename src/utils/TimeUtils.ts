/*
 * @Author: your name
 * @Date: 2021-08-18 16:38:39
 * @LastEditTime: 2021-08-18 16:56:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rn05ts/src/utils/TimeUtil.ts
 */

type IDate = {
  year: number;
  month: number;
  day: number;
};

type ITimeData = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yearString: string;
  monthString: string;
  dayString: string;
  hourString: string;
  minuteString: string;
  secondString: string;
};

const parseWeekDay = (day: number, type = 1) => {
  let result = '';
  switch (day) {
    case 0:
      if (type === 1) {
        result = '一';
      } else if (type === 2) {
        result = '周一';
      } else if (type === 3) {
        result = '星期一';
      }
      break;

    case 1:
      if (type === 1) {
        result = '二';
      } else if (type === 2) {
        result = '周二';
      } else if (type === 3) {
        result = '星期二';
      }
      break;
    case 2:
      if (type === 1) {
        result = '三';
      } else if (type === 2) {
        result = '周三';
      } else if (type === 3) {
        result = '星期三';
      }
      break;
    case 3:
      if (type === 1) {
        result = '四';
      } else if (type === 2) {
        result = '周四';
      } else if (type === 3) {
        result = '星期四';
      }
      break;
    case 4:
      if (type === 1) {
        result = '五';
      } else if (type === 2) {
        result = '周五';
      } else if (type === 3) {
        result = '星期五';
      }
      break;
    case 5:
      if (type === 1) {
        result = '六';
      } else if (type === 2) {
        result = '周六';
      } else if (type === 3) {
        result = '星期六';
      }
      break;
    case 6:
      if (type === 1) {
        result = '日';
      } else if (type === 2) {
        result = '周日';
      } else if (type === 3) {
        result = '星期日';
      }
      break;
    default:
      break;
  }
  return result;
};

const formattingValueString = (value: number) => {
  return value > 9 ? `${value}` : `0${value}`;
};

const formatDateToString = (date: IDate) => {
  const { year, month = 0, day = 0 } = date;
  return `${year}-${formattingValueString(month)}-${formattingValueString(
    day
  )}`;
};

const getDateByDateString = (str = '') => {
  const list = str.split('-');
  const [ys, ms, ds] = list;
  return {
    year: parseInt(ys, 10),
    month: parseInt(ms, 10),
    day: parseInt(ds, 10),
  };
};

const getWeekDayText = (dayIndex: number) => {
  let text = '';
  switch (dayIndex) {
    case 0:
      text = '周日';
      break;
    case 1:
      text = '周一';
      break;
    case 2:
      text = '周二';
      break;
    case 3:
      text = '周三';
      break;
    case 4:
      text = '周四';
      break;
    case 5:
      text = '周五';
      break;
    case 6:
      text = '周六';
      break;
    default:
      break;
  }

  return text;
};

const getTimeDuraitonDataBySeconds = (seconds: number) => {
  let hour = 0;
  let minute = 0;
  let second = 0;
  if (seconds < 60) {
    second = seconds;
  } else if (seconds < 3600) {
    minute = Math.floor(seconds / 60);
    second = seconds % 60;
  } else {
    hour = Math.floor(seconds / 3600);
    const sec = seconds - hour * 3600;
    minute = Math.floor(sec / 60);
    second = sec % 60;
  }

  return {
    hour,
    minute,
    second,
  };
};

const formateTimeDurationString = (data: ITimeData) => {
  const { hour, minute, second } = data;
  const m = formattingValueString(minute);
  const s = formattingValueString(second);
  if (hour) {
    return `${formattingValueString(hour)}:${m}:${s}`;
  }
  return `${m}:${s}`;
};

const getTimeStampByDate = (
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0
) => {
  const date = new Date(year, month, day, hour, minute, second);
  return date.getTime();
};

const getTimeData = (milSeconds: number) => {
  const date = new Date(milSeconds);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const yearString = `${year}`;
  const monthString = formattingValueString(month);
  const dayString = formattingValueString(day);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const hourString = formattingValueString(hour);
  const minuteString = formattingValueString(minute);
  const secondString = formattingValueString(second);

  return {
    year,
    month,
    day,

    hour,
    minute,
    second,
    milliseconds,

    yearString,
    monthString,
    dayString,

    hourString,
    minuteString,
    secondString,
  };
};

const getMinutesData = (minutes = 0) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return {
    hour,
    minute,
    hourString: formattingValueString(hour),
    minuteString: formattingValueString(minute),
  };
};

const getMonthDayCount = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

type IWeekRow = {
  row: number;
  col: number;
  value: number;
  year: number;
  month: number;
  timestamp: number;
};

const getMonthGridData = (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  const monthDayCount = new Date(year, month, 0).getDate();
  let monthStart = startDate.getDay();
  // console.log('month day count = ', monthDayCount);
  // console.log('start date ', startDate);
  if (monthStart === 0) monthStart = 7;
  // console.log('month start = ', monthStart);

  const grid: (IWeekRow | null)[][] = [];
  let dayIndex = 1;
  let row = 0;
  let col = 0;
  while (dayIndex <= monthDayCount) {
    if (!grid[row]) {
      grid[row] = [];
    }
    const week = grid[row];
    if (row === 0) {
      if (col < monthStart - 1) {
        week[col] = null;
        col += 1;
        continue;
      } else {
        const timestamp = getTimeStampByDate(year, month - 1, dayIndex);
        week[col] = { row, col, value: dayIndex, year, month, timestamp };
      }
    } else {
      const timestamp = getTimeStampByDate(year, month - 1, dayIndex);
      week[col] = { row, col, value: dayIndex, year, month, timestamp };
    }
    if (col === 6) {
      row += 1;
      col = 0;
    } else {
      col += 1;
    }
    if (dayIndex === monthDayCount && week.length < 7) {
      const fixCount = 7 - week.length;
      for (let i = 0; i < fixCount; i += 1) {
        week.push(null);
      }
    }
    dayIndex += 1;
  }
  // console.log('init grid = ', grid);
  return {
    grid,
    monthDayCount,
    monthStartDay: monthStart,
  };
};
const oneDay = 3600 * 24 * 1000;

const getTimeString = (timestamp = 0) => {
  const {
    yearString: cy,
    monthString: cm,
    dayString: cd,
    hourString: ch,
    minuteString: cmm,
    secondString: cs,
  } = getTimeData(timestamp);
  return `${cy}/${cm}/${cd} ${ch}:${cmm}:${cs}`;
};

const getMonthListByDate = (startDate: IDate, endDate: IDate) => {
  const { year: startYear, month: startMonth } = startDate;
  const { year: endYear, month: endMonth } = endDate;

  let y = startYear;
  let m = startMonth;
  const result = [
    {
      year: y,
      month: m,
    },
  ];
  while (y !== endYear || m !== endMonth) {
    if (m === 12) {
      m = 1;
      y += 1;
    } else {
      m += 1;
    }
    result.push({
      year: y,
      month: m,
    });
  }

  return result;
};

const getMonthListByCount = (
  year: number,
  month: number,
  monthCount: number
) => {
  let i = 0;
  const result = [];
  let y = year;
  let m = month;
  if (monthCount > 0) {
    while (i < monthCount) {
      if (m === 12) {
        m = 1;
        y += 1;
      } else {
        m += 1;
      }
      result.push({
        year: y,
        month: m,
      });
      i += 1;
    }
  } else {
    while (i > monthCount) {
      if (m === 1) {
        year -= 1;
        m = 12;
      } else {
        m -= 1;
      }
      result.push({
        year: y,
        month: m,
      });
      i -= 1;
    }
  }

  return result;
};

export default {
  parseWeekDay,
  getTimeData,
  getTimeStampByDate,
  formattingValueString,
  formatDateToString,
  getDateByDateString,
  getTimeDuraitonDataBySeconds,
  formateTimeDurationString,
  getMinutesData,
  getMonthGridData,
  oneDay,
  getWeekDayText,
  getTimeString,
  getMonthListByDate,
  getMonthListByCount,
  getMonthDayCount,
};
