import React, {Component} from 'react';

import PropTypes from 'prop-types';


export default class FileItem extends React.PureComponent {
    static propTypes = {
        file: PropTypes.instanceOf(Object),
    };

    static defaultProps = {
    };

    render() {
        const { file: { name } } = this.props;
        return (
          <div>
              {name}
          </div>
        )
    }
}