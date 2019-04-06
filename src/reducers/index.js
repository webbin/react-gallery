import timeReducer from './timeReducer';
import locationReducer from './locationReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    timeReducer,
    locationReducer,
});

export default reducers;
