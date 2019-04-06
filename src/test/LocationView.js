import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setLocationName } from '../actions/locationActions';


class LocationView extends React.PureComponent {
    onSetLocationName = () => {
        this.props.dispatch(setLocationName('GuangZhou'));
    };

    render() {


        return (
          <div style={{ margin: 20 }}>
              location view:
              <p>
                  location name is {this.props.locationName}
              </p>

              <button style={{ margin: 5 }} onClick={this.onSetLocationName}>
                  set guangzhou
              </button>
          </div>
        )
    }
}

const getLocationReducer = (store) => store.locationReducer;

const getLocationName = createSelector(
  [getLocationReducer],
  (locationReducer) => {
      return locationReducer.locationName;
  },
);

const mapState = (store) => {
    return {
        locationName: getLocationName(store),
    };
};


export default connect(mapState)(LocationView);