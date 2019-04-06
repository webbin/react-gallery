import {
    SET_NO_TIME,
    SET_SHOW_TIME,
    SET_TIME_STEP,
} from '../constant/ActionTypes';

export const showTime = () => ({
    type: SET_SHOW_TIME,
});

export const setTimeStep = (step) => ({
    type: SET_TIME_STEP,
    data: step,
});

export const noTime = () => ({
    type: SET_NO_TIME,
});


