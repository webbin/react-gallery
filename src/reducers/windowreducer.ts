import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { IWindow, IWindowType } from './types';

const InitState: IWindow = {
  type: 'Large',
};

const setWindowType = createAction<IWindowType>('SET_WINDOW_TYPE');
const notifyWindowResize = createAction<number>('NOTIFY_WINDOW_RESIZE');

const windowData = createReducer(InitState, (builder) => {
  builder
    .addCase(setWindowType, (state, action) => {
      state.type = action.payload;
    })
    .addCase(notifyWindowResize, (state, action) => {
      const newType = action.payload > 400 ? 'Large' : 'Small';
      if (state.type !== newType) {
        console.log('update window type: ', newType);
        state.type = newType;
      }
    });
});

export default windowData;
export { setWindowType, notifyWindowResize };
