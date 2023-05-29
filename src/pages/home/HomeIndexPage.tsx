import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
  RouteComponentProps,
  Link,
  useRouteMatch,
} from 'react-router-dom';

import { useAppSelector } from '../../reducers/hooks';
import styles from './homepage.module.scss';
import HomePage from './HomePage';
import Home1Page from './home1/Home1Page';
import Home2Page from './home2/Home2Page';
import Routers from '../../constants/Routers';
import SideMenuView from './SideMenuView';

export default function HomeIndexPage(props: RouteComponentProps) {
  const { location, match, history } = props;
  const RouteMatch = useRouteMatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const currentPath = match.url === '/' ? Routers.HomePage : match.url;

  useEffect(() => {
    console.log(' location ', location);
    console.log(' match ', match);
    console.log(' RouteMatch ', RouteMatch);
    return () => {
      //
    };
  }, []);

  const isSmallWindow = useAppSelector(
    (store) => store.windowData.type === 'Small'
  );

  return (
    <div>
      {isSmallWindow ? (
        <SideMenuView
          onRequestClose={() => {
            setMenuVisible(false);
          }}
          visible={menuVisible}
        />
      ) : null}
      <div className={styles.tab_container}>
        <div
          style={{ userSelect: 'none' }}
          className={`${styles.tab} ${styles.tab_common}`}
          onClick={() => {
            setMenuVisible((old) => !old);
          }}
        >
          Menu
        </div>
        <Link
          to={Routers.HomePage}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Home
        </Link>
        <div style={{ flex: 1 }}></div>
        <Link
          to={`${currentPath}/home1`}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Getting Start
        </Link>
        <Link
          to={`${currentPath}/home2`}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Tutorial
        </Link>
      </div>
      <Switch>
        <Route exact path={`${Routers.HomePage}/home1`} component={Home1Page} />
        <Route exact path={`${Routers.HomePage}/home2`} component={Home2Page} />
        <Route exact path={`${match.url}`} component={HomePage} />
      </Switch>
    </div>
  );
}
