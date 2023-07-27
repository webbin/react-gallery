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
import type { MenuItemProps } from 'antd';
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

import HomeIndexPage from '../home/HomeIndexPage';
import DevelopmentTestPage from './home_content/DevelopmentTestPage';
import DocumentsPage from './home_content/DocumentsPage';
import ToolsPage from './home_content/ToolsPage';
import Logo from './Logo';

import { RouterList } from '../../constants/Routers';
import { setWindowType } from '../../reducers/actions';
import { IWindowType } from '../../reducers/types';
import { useAppDispatch } from '../../reducers/hooks';

// type Props = PropsFromRedux;

const { Sider, Header, Footer, Content } = Layout;
let windowSizeType: IWindowType;
const MIN_WIDTH = 420;

function generateMenuItem(props: {
  name: string;
  // path?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  const { name, onClick, icon } = props;
  return {
    key: name,
    title: name,
    label: name,
    onClick,
    icon,
  };
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
      <Header>
        <Logo />
        <div>This is Header</div>
      </Header>

      <Layout>
        <Sider
          collapsed={fold}
          breakpoint="xs"
          onBreakpoint={(broken) => {
            setFold(broken);
          }}
        >
          <Menu
            theme="dark"
            items={[
              generateMenuItem({
                name: 'Home',
                icon: <HomeOutlined />,
                onClick: () => {
                  navigate('/home');
                },
              }),
              generateMenuItem({
                name: 'Developemt Test',
                icon: <LaptopOutlined />,
                onClick: () => {
                  navigate('/development_test');
                },
              }),
              generateMenuItem({
                name: 'Documents',
                icon: <ReadOutlined />,
                onClick: () => {
                  navigate('/documents');
                },
              }),
              generateMenuItem({
                name: 'Tools',
                icon: <ToolOutlined />,
                onClick: () => {
                  navigate('/tools');
                },
              }),
            ]}
          ></Menu>
          <div></div>
        </Sider>
        <Content>
          <Routes>
            <Route path="/" element={<HomeIndexPage />} />
            <Route path="/home" element={<HomeIndexPage />} />
            <Route path="/development_test" element={<DevelopmentTestPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
