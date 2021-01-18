import { combineReducers } from 'redux';

import timeReducer from './timeReducer';
import locationReducer from './locationReducer';
import temperature from './temperature';

const reducers = combineReducers({
  timeReducer,
  locationReducer,
  temperature,
});

export default reducers;
