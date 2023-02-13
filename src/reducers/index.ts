/*
 * @Author: weibin.zheng
 * @Date: 2021-02-23 10:38:43
 * @LastEditTime: 2022-03-31 17:10:23
 * @LastEditors: Please set LastEditors
 * @Description: content
 * @FilePath: /base-react-webpack-ts/src/reducers/index.ts
 */
import { combineReducers } from 'redux';

import HomeData from './HomeData';
import data from './data';

const reducers = combineReducers({
  data,
  HomeData,
});

export default reducers;
