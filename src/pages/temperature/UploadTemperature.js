import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Temperature.css';
import { pushTemperatureData } from '../../actions/temperatureActions';

class UploadTemperature extends Component {
  constructor(props) {
    super(props);

    this.text = '';
  }

  onPushTemperature = () => {
    try {
      // const data = JSON.parse(this.text);

      const test = {
        humidity: 75.4,
        temperature: 15.2,
      };

      this.props.dispatch(pushTemperatureData(test));
    } catch (err) {
      console.log('json parse error, ', this.text);
    }
  };

  onTextChange = (event) => {
    // console.log('on text change ', event.nativeEvent.data);
    // console.log('on text change ', event.target.value);
    this.text = event.target.value;
  };

  render() {
    return (
      <div className='upload-temperature-container'>
        <textarea
          className='upload-text-area'
          onChange={this.onTextChange}
        ></textarea>
        <button id='temperature-upload' onClick={this.onPushTemperature}>
          Upload
        </button>
      </div>
    );
  }
}

const mapState = () => {
  return {};
};

export default connect(mapState)(UploadTemperature);
