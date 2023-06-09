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

  const hourString = formattingValueString(hour);
  const minuteString = formattingValueString(minute);
  const secondString = formattingValueString(second);

  const milliseconds = date.getMilliseconds()

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

export default {
  getTimeData,
  formattingValueString,
  parseWeekDay,
};
