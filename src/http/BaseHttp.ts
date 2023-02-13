/*
 * @Author: your name
 * @Date: 2021-05-30 23:14:19
 * @LastEditTime: 2021-06-06 17:14:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/http/BaseHttp.ts
 */
import axios from 'axios';
import { BaseUrl } from '../constants/HttpUrl';
import GlobalData from '../constants/GlobalData';
type IHttpParams = { [key: string]: string | null | undefined | number };

// axios.defaults.withCredentials = true;

const parseParams2String = (params: IHttpParams) => {
  let paramStr = '';
  const keys = Object.keys(params);
  if (!keys.length) return '';
  keys.forEach((k, index) => {
    const v = params[k];
    paramStr = `${paramStr}${k}=${v}`;
    if (index < keys.length - 1) {
      paramStr = `${paramStr}&`;
    }
  });
  console.log('parse params ', params);
  return paramStr;
};

export const baseHttpGet = async <T>(
  path: string,
  params: IHttpParams = {}
): Promise<T> => {
  let url = '';
  const data = { ...params };
  if (GlobalData.token) {
    data.token = GlobalData.token;
    data.cookie = encodeURIComponent(GlobalData.cookie);
  }
  const paramStr = parseParams2String(data);
  url = `${BaseUrl}${path}?${paramStr}`;
  console.log(`base http url = ${url}`);
  const response = await axios.get(url);
  return response.data;
};
