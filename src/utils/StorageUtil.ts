/*
 * @Author: your name
 * @Date: 2021-06-01 22:51:03
 * @LastEditTime: 2021-06-01 23:00:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/utils/StorageUtil.ts
 */

class StorageUtil {
  static saveData = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  static getData = (key: string) => {
    return localStorage.getItem(key);
  };

  static removeData = (key: string) => {
    localStorage.removeItem(key);
  };
}

export default StorageUtil;
