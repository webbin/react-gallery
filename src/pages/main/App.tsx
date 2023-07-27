/*
 * @Author: weibin.zheng
 * @Date: 2021-02-23 10:38:43
 * @LastEditTime: 2022-06-08 12:03:53
 * @LastEditors: zhengweibin zhengweibin-a0925@aqara.com
 * @Description: content
 * @FilePath: /base-react-webpack-ts/src/App.tsx
 */
import React, { useEffect } from 'react';
import {
  Route,
  useNavigate,
  Routes,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Layout, Menu } from 'antd';

import './App.css';
import styles from './main.module.scss';

import HomeIndexPage from '../home/HomeIndexPage';
import DevelopmentTestPage from './home_content/DevelopmentTestPage';
import DocumentsPage from './home_content/DocumentsPage';
import ToolsPage from './home_content/ToolsPage';

import { RouterList } from '../../constants/Routers';
import { setWindowType } from '../../reducers/actions';
import { IWindowType } from '../../reducers/types';
import { useAppDispatch } from '../../reducers/hooks';

// type Props = PropsFromRedux;

const { Sider, Header, Footer, Content } = Layout;
let windowSizeType: IWindowType;
const MIN_WIDTH = 420;

function App() {
  // const location = useLocation();
  const navigate = useNavigate();
  const dispath = useAppDispatch();

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
    <Layout>
      <Sider>
        <div>webbin.cn</div>
        <Menu
          theme='dark'
          items={[
            {
              key: 'Home',
              title: 'Home',
              onClick: () => {
                navigate('/home');
              },
            },
            {
              key: 'Developemt Test',
              title: 'Developemt Test',
              onClick: () => {
                navigate('/development_test');
              },
            },
            {
              key: 'Documents',
              title: 'Documents',
              onClick: () => {
                navigate('/documents');
              },
            },
            {
              key: 'Tools',
              title: 'Tools',
              onClick: () => {
                navigate('/tools');
              },
            },
          ]}
        ></Menu>
      </Sider>
      <Layout>
        <Header>
          <div>This is Header</div>
        </Header>
        <Content>
          <Routes>
            <Route path='/' element={<HomeIndexPage />} />
            <Route path='/home' element={<HomeIndexPage />} />
            <Route path='/development_test' element={<DevelopmentTestPage />} />
            <Route path='/documents' element={<DocumentsPage />} />
            <Route path='/tools' element={<ToolsPage />} />
          </Routes>
        </Content>
        <Footer>
          <div>Footer</div>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
