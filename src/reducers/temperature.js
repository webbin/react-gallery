import { PUSH_TEMPERATURE } from '../constant/ActionTypes';

const InitState = [];

const pushTemperatureData = (state = [], data) => {
  const result = Array.from(state);
  if (state.length >= 24) {
    result.shift();
  }
  result.push(data);
  return result;
};

const temperature = (state = InitState, action) => {
  const { type, data } = action;
  switch (type) {
    default:
      return state;
    case PUSH_TEMPERATURE:
      return pushTemperatureData(state, data);
  }
};

export default temperature;