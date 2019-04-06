import {
    SET_LOCATION_ID,
    SET_LOCATION_NAME,
} from '../constant/ActionTypes';


const init = {
    locationId: 0,
    locationName: '',
};

const locationReducer = (state = init, action) => {
    const { data, type } = action;
    switch (type) {
        case SET_LOCATION_NAME:
            return Object.assign({}, state, {
                locationName: data,
            });
        case SET_LOCATION_ID:
            return Object.assign({}, state, {
                locationId: data,
            });
        default: return state;
    }
};

export default locationReducer;
