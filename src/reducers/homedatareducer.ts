import { createReducer, createAction } from '@reduxjs/toolkit';

import { IHomeData } from './types';

const InitState:IHomeData = {
  homeStatus: 0,
};

const setHomeStatus = createAction<number>('SET_HOME_STATUS');

const homeData = createReducer(InitState, (builder) => {
  builder.addCase(setHomeStatus, (state, action) => {
    state.homeStatus = action.payload;
  });
});

export default homeData;
export { setHomeStatus }
