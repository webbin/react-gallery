import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { showTime, noTime, setTimeStep } from '../actions/timeActions';

class TimeView extends React.PureComponent {

    constructor(props) {
    	super(props);

    	this.step = 100;
    }

    onShowTime = () => {
        this.props.dispatch(showTime());
    };

    onNoTime = () => {
        this.props.dispatch(noTime());
    };

    onSetTimeStep = () => {
        this.step += 1;
        this.props.dispatch(setTimeStep(this.step));
    };

    onKeepTimeStep = () => {
        this.props.dispatch(setTimeStep(this.step));
    };

    render() {
        console.log('time view render');
        return (
            <div style={{
                alignItems: 'flex-start',
            }}>
                this is time view
                <p>
                    {this.props.showTime.toString()}
                </p>
                <p>
                    now step = {this.props.timeData.step}
                </p>

                <button style={{ margin: 5 }} onClick={this.onShowTime}>
                    show time
                </button>

                <button style={{ margin: 5 }} onClick={this.onNoTime}>
                    no time
                </button>

                <button style={{ margin: 5 }} onClick={this.onSetTimeStep}>
                    set time step
                </button>


                <button style={{ margin: 5 }} onClick={this.onKeepTimeStep}>
                    keep time step
                </button>
            </div>
        );
    }
}

const getTimeReducer = (store) => store.timeReducer;
const getTimeReducerData = (store) => store.timeReducer.timeData;

const getShowTime = createSelector(
  [getTimeReducer],
  (timeReducer) => {
      return timeReducer.showTime;
  },
);

const getTimeData = createSelector(
  [getTimeReducer],
  (timeReducer) => {
      console.log('time data calculating...');
      return timeReducer.timeData;
  },
);

const mapState = (store) => {
    return {
        showTime: getShowTime(store),
        timeData: getTimeData(store),
    };
};


export default connect(mapState)(TimeView);
