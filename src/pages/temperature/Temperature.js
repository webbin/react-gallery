import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';

import './Temperature.css';

class Temperature extends Component {
  componentDidMount() {
    //
  }

  getChartOption = () => {
    return {
      title: { text: '', show: false },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
  };

  renderShowTemperature = () => {
    const { temperature } = this.props;
    let data1 = '--';
    let data2 = '--';
    if (temperature.length) {
      const data = temperature[temperature.length - 1];
      data1 = `${data.temperature}℃`;
      data2 = `${data.humidity}%`;
    }

    return (
      <div className='temperature-text-container'>
        <div className='temperature-text'>
          <span className='temperature-text-span'>{data1}</span>
        </div>
        <div className='temperature-text'>
          <span className='temperature-text-span'>{data2}</span>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className='temperature-container'>
        Temperature ECharts
        {this.renderShowTemperature()}
        <ReactEcharts option={this.getChartOption()} />
      </div>
    );
  }
}

const mapState = (store) => {
  const { temperature } = store;
  return {
    temperature,
  };
};

export default connect(mapState)(Temperature);
