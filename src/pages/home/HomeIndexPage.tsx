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

export default function HomeIndexPage(props: RouteComponentProps) {
  const { location, match, history } = props;
  const RouteMatch = useRouteMatch()

  useEffect(() => {
    console.log(' location ', location);
    console.log(' match ', match);
    console.log(' RouteMatch ', RouteMatch);
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <Link
          to={`${match.path}`}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Home
        </Link>
        {/* <Link
          to={`${match.path}/home1`}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Home 1
        </Link> */}
        <div
          className={`${styles.tab} ${styles.tab_common}`}
          onClick={() => {
            history.push('/home/home1');
          }}
        >
          Home 1
        </div>
        <Link
          to={`${match.path}/home2`}
          className={`${styles.tab} ${styles.tab_common}`}
        >
          Home 2
        </Link>
      </div>
      <Switch>
        <Route path={`${match.path}`} component={HomePage} />
        <Route path={`${match.path}/home1`} component={Home1Page} />
        <Route path={`${match.path}/home2`} component={Home2Page} />
      </Switch>
    </div>
  );
}
