

import {
    SET_LOCATION_ID,
    SET_LOCATION_NAME,
} from '../constant/ActionTypes';


export const setLocationId = (id) => ({
    type: SET_LOCATION_ID,
    data: id,
});


export const setLocationName = (name) => ({
    type: SET_LOCATION_NAME,
    data: name,
});