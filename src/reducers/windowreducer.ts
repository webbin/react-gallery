import { createReducer, createAction } from '@reduxjs/toolkit';

import { IWindow, IWindowType } from './types';

const InitState: IWindow = {
  type: 'Large',
};

const setWindowType = createAction<IWindowType>('SET_WINDOW_TYPE');

const windowData = createReducer(InitState, (builder) => {
  builder.addCase(setWindowType, (state, action) => {
    state.type = action.payload;
  });
});

export default windowData;
