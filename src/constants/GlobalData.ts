/*
 * @Author: your name
 * @Date: 2021-06-01 22:49:02
 * @LastEditTime: 2021-06-06 17:12:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/constants/GlobalData.ts
 */
import StorageUtil from '../utils/StorageUtil';
import StroageKeys from './StroageKeys';

class GlobalData {
  static token = '';
  static cookie = '';
  static saveToken = (token: string, cookie: string, uid: string) => {
    GlobalData.token = token;
    GlobalData.cookie = cookie;
    StorageUtil.saveData(StroageKeys.TokenKey, token);
    StorageUtil.saveData(StroageKeys.Cookie, cookie);
    StorageUtil.saveData(StroageKeys.Uid, uid);
  };

  static removeToken = () => {
    GlobalData.token = '';
    StorageUtil.removeData(StroageKeys.TokenKey);
    StorageUtil.removeData(StroageKeys.Cookie);
    StorageUtil.removeData(StroageKeys.Uid);
  };
}

export default GlobalData;
