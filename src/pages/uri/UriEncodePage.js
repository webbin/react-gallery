import React, { Component } from 'react';

export default class UriEncodePage extends Component {
  constructor(props) {
    super(props);

    this.text = '';

    this.state = {
      result: '',
    };
  }

  onTextChange = (event) => {
    // console.log('on text change ', event.target.value);
    this.text = event.target.value;
  };

  onEncode = () => {
    this.setState({ result: encodeURIComponent(this.text) });
  };

  onDecode = () => {
    this.setState({ result: decodeURIComponent(this.text) });
  };

  render() {
    const { result } = this.state;
    return (
      <div>
        <textarea onChange={this.onTextChange}></textarea>

        <button onClick={this.onEncode}>Encode</button>
        <button onClick={this.onDecode}>Decode</button>

        <div>{result}</div>
      </div>
    );
  }
}
