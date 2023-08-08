import React, { useEffect, useState, useMemo } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Layout, Breadcrumb } from 'antd';

import { useAppSelector } from '../../reducers/hooks';
import styles from './homepage.module.scss';

import HomePage from './HomePage';
import StationPage from '../stations/StationPage';
import TransformPage from '../transform/TransformPage';
import WindowPage from '../window/WindowPage';

// import SideMenuView from './SideMenuView';

const RouteConfig = [
  {
    path: 'stations',
    component: <StationPage />,
  },
  {
    path: 'transform/*',
    component: <TransformPage />,
  },
  {
    path: 'window',
    component: <WindowPage />,
  },
  {
    path: '',
    component: <HomePage />,
  },
];

export default function HomeIndexPage() {
  const location = useLocation();
  console.log('home index path: ', location.pathname);  

  const crumbs = useMemo(() => {
    if (location.pathname === '/') {
      return [{
        title: <Link to='/'>Home</Link>,
        key: 'Home',
        className: styles.breadcumb,
      }];
    }
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    // console.log('path snippets ', pathSnippets);

    return pathSnippets.map((item, index) => {
      let path = 'home';
      if (index > 0) {
        path = pathSnippets.slice(0, index + 1).join('/');
      }
      // console.log('item ', item, ', path: ', path);
      return {
        title: <Link to={`/${path}`}>{item}</Link>,
        key: item,
        className: styles.breadcumb,
      };
    });
  }, [location.pathname]);

  useEffect(() => {
    console.log('Home Index page, location ', location);
    return () => {
      //
    };
  }, []);

  const isSmallWindow = useAppSelector(
    (store) => store.windowData.type === 'Small'
  );
  console.log('is small window ? ', isSmallWindow);

  // return (
  //   <div id="home_index_root" className={styles.home_root}>
  //     {isSmallWindow ? (
  //       <SideMenuView
  //         onRequestClose={() => {
  //           setMenuVisible(false);
  //         }}
  //         visible={menuVisible}
  //       />
  //     ) : null}
  //     <div className={styles.tab_container}>
  //       {isSmallWindow ? (
  //         <div
  //           style={{ userSelect: 'none' }}
  //           className={`${styles.tab} ${styles.tab_common}`}
  //           onClick={() => {
  //             setMenuVisible((old) => !old);
  //           }}
  //         >
  //           Menu
  //         </div>
  //       ) : null}
  //       <Link
  //         to={Routers.HomePage}
  //         className={`${styles.tab} ${styles.tab_common}`}
  //       >
  //         Home
  //       </Link>
  //       <div style={{ flex: 1 }}></div>
  //       {!isSmallWindow ? (
  //         <Link
  //           to={`${currentPath}/home1`}
  //           className={`${styles.tab} ${styles.tab_common}`}
  //         >
  //           Getting Start
  //         </Link>
  //       ) : null}
  //       {!isSmallWindow ? (
  //         <Link
  //           to={`${currentPath}/home2`}
  //           className={`${styles.tab} ${styles.tab_common}`}
  //         >
  //           Tutorial
  //         </Link>
  //       ) : null}
  //     </div>
  //     <TransitionGroup className={styles.router_group}>
  //       <CSSTransition key={location.key} classNames="fade" timeout={300}>
  //         <Routes location={location}>
  //           <Route path={`${Routers.HomePage}/home1`} element={<Home1Page />} />
  //           <Route path={`${Routers.HomePage}/home2`} element={<Home2Page />} />
  //           <Route path={`${location.pathname}`} element={<HomePage />} />
  //         </Routes>
  //       </CSSTransition>
  //     </TransitionGroup>
  //   </div>
  // );

  return (
    <>
      <Breadcrumb
        style={{
          paddingTop: 10,
          paddingBottom: 0,
          paddingLeft: 30,
          paddingRight: 40,
        }}
        items={crumbs}
      />
      <Routes>
        {RouteConfig.map((item) => {
          const { component } = item;
          return <Route path={item.path} element={component} key={item.path} />;
        })}
      </Routes>
    </>
  );
}
