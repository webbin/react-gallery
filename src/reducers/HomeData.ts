/*
 * @Author: your name
 * @Date: 2021-12-30 20:59:38
 * @LastEditTime: 2022-03-31 17:15:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /react-mobile/src/reducers/homeData.ts
 */
import { SET_HOME_STATUS } from '../constants/ActionTypes';

export type IHomeData = {
  homeStatus: number;
};

const InitState = {
  homeStatus: 0,
};

const HomeData = (
  state = InitState,
  action: { type: string; data: any }
): IHomeData => {
  const { type, data } = action;
  switch (type) {
    case SET_HOME_STATUS:
      return { ...state, homeStatus: data };

    default:
      return state;
  }
};

export default HomeData;
