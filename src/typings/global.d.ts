/*
 * @Author: your name
 * @Date: 2021-05-25 15:18:21
 * @LastEditTime: 2021-05-25 18:42:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/typings/global.d.ts
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: any };
  export default content;
}

declare module '*.txt' {
  const content: string;
  export default content;
}
