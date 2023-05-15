import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
  RouteComponentProps,
  Link,
  useRouteMatch,
} from 'react-router-dom';

import styles from './homepage.module.scss';
import HomePage from './HomePage';
import Home1Page from './home1/Home1Page';
import Home2Page from './home2/Home2Page';
import Routers from '../../constants/Routers';

export default function HomeIndexPage(props: RouteComponentProps) {
  const { location, match, history } = props;
  const RouteMatch = useRouteMatch();

  const currentPath = match.url === '/' ? Routers.HomePage : match.url;

  useEffect(() => {
    console.log(' location ', location);
    console.log(' match ', match);
    console.log(' RouteMatch ', RouteMatch);
    return () => {
      //
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <Link
          to={Routers.HomePage}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Home
        </Link>
        <Link
          to={`${currentPath}/home1`}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Home 1
        </Link>
        <Link
          to={`${currentPath}/home2`}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Home 2
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
