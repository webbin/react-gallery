/*
 * @Author: weibin.zheng
 * @Date: 2021-02-23 10:38:43
 * @LastEditTime: 2022-06-08 12:03:53
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @Description: content
 * @FilePath: /base-react-webpack-ts/src/App.tsx
 */
import React, { useEffect, useState } from 'react';
import { Route, useNavigate, Routes } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  LaptopOutlined,
  ToolOutlined,
  ReadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import './App.css';
import styles from './main.module.scss';

import Routers from '../../constants/Routers';

import HomeIndexPage from '../home/HomeIndexPage';
import Home1Page from '../home/home1/Home1Page';
import Home2Page from '../home/home2/Home2Page';
import DevelopmentTestPage from './home_content/DevelopmentTestPage';
import DocumentsPage from './home_content/DocumentsPage';
// import ToolsPage from './home_content/ToolsPage';
import AlgorithmPage from '../algorithm/AlgorithmPage';
import ColorPage from '../colors/ColorPage';
import BatteryPage from '../battery/BatteryPage';

import Logo from './Logo';

import { setWindowType } from '../../reducers/actions';
import { IWindowType } from '../../reducers/types';
import { useAppDispatch } from '../../reducers/hooks';
import AnimationPage from '../animation/AnimationPage';
import ReactSpringPage from '../animation/ReactSpringPage';
import ReactKey from '../reactkey/ReactKey';
import MasonryPage from '../masonry/MasonryPage';
import CanvasPage from '../canvas/CanvasPage';
import PieChartPage from '../chart/PieChartPage';

// type Props = PropsFromRedux;
type MenuItem = Required<MenuProps>['items'][number];

const { Sider, Header, Footer, Content } = Layout;
let windowSizeType: IWindowType;
const MIN_WIDTH = 420;

function generateMenuItem(props: {
  name: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: 'divider' | 'group';
  children?: MenuItem[];
}): MenuItem {
  const { name, onClick, icon, type, children } = props;
  return {
    key: name,
    title: name,
    label: name,
    onClick,
    icon,
    type,
    children,
  } as MenuItem;
}

function App() {
  // const location = useLocation();
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const [fold, setFold] = useState(false);

  useEffect(() => {
    // window.history
    console.log('location ', location);
    window.addEventListener('hashchange', (e) => {
      console.log('has change', e);
    });
    windowSizeType = window.innerWidth > MIN_WIDTH ? 'Large' : 'Small';
    dispath(setWindowType(windowSizeType));

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // console.log(' window resize, width: ', width, ', height: ', height);
      if (!windowSizeType) {
        windowSizeType = width > MIN_WIDTH ? 'Large' : 'Small';
        dispath(setWindowType(windowSizeType));
      } else {
        const newType = width > MIN_WIDTH ? 'Large' : 'Small';
        if (newType !== windowSizeType) {
          windowSizeType = newType;
          dispath(setWindowType(newType));
        }
      }
    });
    return () => {
      console.log('App unmount');
    };
  }, []);

  // return (
  //   <Router>
  //     <TransitionGroup
  //       id="transition-group"
  //       className={styles.transition_group}
  //     >
  //       <CSSTransition
  //         key={location.pathname}
  //         classNames={{
  //           appear: styles.page_appear,
  //           // appearActive: 'my-active-appear',
  //           // appearDone: 'my-done-appear',
  //           enter: styles.page_enter,
  //           enterActive: styles.page_enter_active,
  //           enterDone: styles.page_enter_done,
  //           // exit: styles.page_exit,
  //           // exitActive: styles.page_exit_active,
  //           // exitDone: 'my-done-exit',
  //         }}
  //         onEnter={() => {
  //           console.log('on enter');
  //         }}
  //         onEntering={() => {
  //           console.log('on entering');
  //         }}
  //         onEntered={() => {
  //           console.log('on entered');
  //         }}
  //         timeout={1000}
  //       >
  //         <Routes>
  //           {RouterList.map((item) => {
  //             const View = item.component;
  //             return (
  //               <Route
  //                 key={item.path}
  //                 element={<View />}
  //                 path={item.path}
  //               />
  //             );
  //           })}
  //         </Routes>
  //       </CSSTransition>
  //     </TransitionGroup>
  //   </Router>
  // );

  return (
    <Layout style={{ height: '100%' }}>
      <Header style={{ paddingLeft: 20 }}>
        <Logo />
        <div>This is Header</div>
      </Header>

      <Layout>
        <Sider
          className={styles.sider}
          collapsed={fold}
          breakpoint="xs"
          onBreakpoint={(broken) => {
            setFold(broken);
          }}
        >
          <Menu
            style={{ flex: 1 }}
            theme="dark"
            defaultOpenKeys={['Home']}
            defaultSelectedKeys={['Home']}
            mode="inline"
            items={[
              generateMenuItem({
                name: 'HomeGroup',
                icon: <HomeOutlined />,
                children: [
                  generateMenuItem({
                    name: 'Home',
                    onClick: () => {
                      navigate('home');
                    },
                  }),
                  generateMenuItem({
                    name: 'Home 1',
                    onClick: () => {
                      navigate('home1');
                    },
                  }),
                  generateMenuItem({
                    name: 'Home 2',
                    onClick: () => {
                      navigate('home2');
                    },
                  }),
                ],
              }),
              generateMenuItem({
                name: 'Developemt Test',
                icon: <LaptopOutlined />,
                children: [
                  generateMenuItem({
                    name: 'Animation',
                    onClick: () => {
                      navigate(Routers.AnimationPage);
                    },
                  }),
                  generateMenuItem({
                    name: 'React Spring',
                    onClick: () => {
                      navigate(Routers.ReactSpringPage);
                    },
                  }),
                  generateMenuItem({
                    name: 'React Key',
                    onClick: () => {
                      navigate(Routers.ReactKeyPage);
                    },
                  }),
                  generateMenuItem({
                    name: 'Masonry',
                    onClick: () => {
                      navigate(Routers.MasonryPage);
                    },
                  }),
                  generateMenuItem({
                    name: 'Canvas',
                    onClick: () => {
                      navigate(Routers.CanvasPage);
                    },
                  }),
                  generateMenuItem({
                    name: 'Piechart',
                    onClick: () => {
                      navigate(Routers.PieChartPage);
                    },
                  }),
                ],
              }),
              generateMenuItem({
                name: 'Documents',
                icon: <ReadOutlined />,
                children: [
                  generateMenuItem({
                    name: 'Algorithm',
                    onClick: () => {
                      navigate(Routers.AlgorithmPage);
                    },
                  }),
                  generateMenuItem({
                    name: 'JavaScript',
                    onClick: () => {
                      navigate('/javascript');
                    },
                  }),
                  generateMenuItem({
                    name: 'HTML',
                    onClick: () => {
                      navigate('/html');
                    },
                  }),
                  generateMenuItem({
                    name: 'CSS',
                    onClick: () => {
                      navigate('/css');
                    },
                  }),
                ],
              }),
              generateMenuItem({
                name: 'Tools',
                icon: <ToolOutlined />,
                children: [
                  generateMenuItem({
                    name: 'iPhone Battery',
                    onClick: () => {
                      navigate(Routers.BatteryPage);
                    },
                  }),
                  generateMenuItem({
                    name: 'Colors',
                    onClick: () => {
                      navigate(Routers.ColorPage);
                    },
                  }),
                ],
              }),
            ]}
          ></Menu>
          <div>Sider Footer</div>
        </Sider>
        <Content style={{ overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<HomeIndexPage />} />
            <Route path="/home/*" element={<HomeIndexPage />} />
            <Route path="/home1" element={<Home1Page />} />
            <Route path="/home2" element={<Home2Page />} />

            {/* Development */}
            <Route path={Routers.AnimationPage} element={<AnimationPage />} />
            <Route
              path={Routers.ReactSpringPage}
              element={<ReactSpringPage />}
            />
            <Route path={Routers.ReactKeyPage} element={<ReactKey />} />
            <Route path={Routers.MasonryPage} element={<MasonryPage />} />
            <Route path={Routers.CanvasPage} element={<CanvasPage />} />
            <Route path={Routers.PieChartPage} element={<PieChartPage />} />

            {/* Documentation */}
            <Route path={Routers.AlgorithmPage} element={<AlgorithmPage />} />

            <Route path={Routers.BatteryPage} element={<BatteryPage />} />
            <Route path={Routers.ColorPage} element={<ColorPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
