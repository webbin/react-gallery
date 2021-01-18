import { PUSH_TEMPERATURE } from '../constant/ActionTypes';

export const pushTemperatureData = (data) => {
  return {
    type: PUSH_TEMPERATURE,
    data,
  };
};
