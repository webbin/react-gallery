import React from 'react';
import { connect } from 'react-redux';

type Props = {
  match: { params: { type: string; url: string } };
};

class BingImageDetail extends React.PureComponent<Props> {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
  }

  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <div>
        <p>Params Type: {params.type}</p>
        <p>Params Url: {params.url}</p>
      </div>
    );
  }
}

export default BingImageDetail;
