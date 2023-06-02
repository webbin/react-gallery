/*
 * @Date: 2021-02-23 14:41:58
 * @LastEditTime: 2021-06-05 14:41:51
 * @Author: zhengweibin
 */

import { Action } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import homeData from './homedatareducer';
import windowData from './windowreducer';

// const enhancer = applyMiddleware(thunk, logger);
// const store = createStore(reducers, enhancer);
const store = configureStore({
  reducer: {
    homeData,
    windowData, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(logger),
  // enhancers: [enhancer],
});

export default store;

export type AppStore = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;

export type AppAction = ThunkAction<
  unknown,
  AppStore,
  unknown,
  Action<unknown>
>;

export type RootState = AppStore;

export type AppDispatch = ThunkDispatch<AppStore, unknown, Action<unknown>>;
export interface User {
  uid: string;
  token: string;
}
