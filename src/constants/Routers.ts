/*
 * @Author: your name
 * @Date: 2021-05-25 10:20:54
 * @LastEditTime: 2022-05-21 15:27:57
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/constants/Roters.ts
 */

import CanvasPageComponent from '../pages/canvas/CanvasPage';
import HomePageComponent from '../pages/home/HomeIndexPage';
import WindowPageComponent from '../pages/window/WindowPage';
import AnimationPageComponent from '../pages/animation/AnimationPage';
import ReactSpringPageComponent from '../pages/animation/ReactSpringPage';
import TransformPageComponent from '../pages/transform/TransformPage';
import ReactKeyPageComponent from '../pages/reactkey/ReactKey';
import MasonryPageComponent from '../pages/masonry/MasonryPage';
import StationPageComponent from '../pages/stations/StationPage';
import ColorPageComponent from '../pages/colors/ColorPage';
import PieChartPageComponent from '../pages/chart/PieChartPage';
import AlgorithmPageComponent from '../pages/algorithm/AlgorithmPage';

const HomePage = '/home';
const WindowPage = '/window';
const AnimationPage = '/animation';
const ReactSpringPage = '/reactspring';
const TransformPage = '/transform';
const ReactKeyPage = '/reactkey';
const MasonryPage = '/masonry';
const StationPage = '/stations';
const ColorPage = '/colors';
const CanvasPage = '/canvas';
const PieChartPage = '/piechart';
const AlgorithmPage = '/algorithm';

export default {
  HomePage,
  WindowPage,
  AnimationPage,
  TransformPage,
  ReactKeyPage,
  MasonryPage,
  ReactSpringPage,
  StationPage,
  ColorPage,
  PieChartPage,
  CanvasPage,
  AlgorithmPage,
};

const RouterList = [
  {
    path: HomePage,
    component: HomePageComponent,
    exact: true,
  },
  {
    path: WindowPage,
    component: WindowPageComponent,
    exact: true,
  },
  {
    path: AnimationPage,
    component: AnimationPageComponent,
    exact: true,
  },
  {
    path: ReactSpringPage,
    component: ReactSpringPageComponent,
    exact: true,
  },
  {
    path: TransformPage,
    component: TransformPageComponent,
    exact: true,
  },
  {
    path: ReactKeyPage,
    component: ReactKeyPageComponent,
    exact: true,
  },
  {
    path: MasonryPage,
    component: MasonryPageComponent,
    exact: true,
  },
  {
    path: CanvasPage,
    component: CanvasPageComponent,
    exact: true,
  },
  {
    path: StationPage,
    component: StationPageComponent,
    exact: true,
  },
  {
    path: ColorPage,
    component: ColorPageComponent,
    exact: true,
  },
  {
    path: PieChartPage,
    component: PieChartPageComponent,
    exact: true,
  },
  {
    path: AlgorithmPage,
    component: AlgorithmPageComponent,
    exact: true,
  },
  {
    path: '/',
    component: HomePageComponent,
    exact: false,
  },
];

export { RouterList };
