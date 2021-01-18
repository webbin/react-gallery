import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Root.css';
import PagesConfig from './PagesConfig';

export default class LeftNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: PagesConfig,
    };
  }

  renderItem = (item, index) => {
    const { name, page } = item;
    const { path } = this.props;

    return (
      <NavLink
        className='nav'
        key={index.toString()}
        to={`${path}/${page}`}
        activeClassName='tab-active'
      >
        {name}
      </NavLink>
    );
  };

  render() {
    const { pages } = this.state;
    return <div className='left-navigator'>{pages.map(this.renderItem)}</div>;
  }
}
