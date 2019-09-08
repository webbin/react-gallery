import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setLocationName } from '../actions/locationActions';


class LocationView extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
		};

	}

	setLocation = (name) => {
		this.props.dispatch(setLocationName(name));

	};

	onKeyPress = (e) => {
		if (e.key === 'Enter') {
			const { value } = this.state;
			this.setLocation(value);
			this.setState({ value: '' });
		}
	};

    onInputChang = (e) => {
	    this.setState({ value: e.target.value })
    };

    render() {
	    const { value } = this.state;

        return (
          <div style={{ margin: 20 }}>
	          <span>
		          尝试使用input的value来更新store里面的locationName
	          </span>
              location view:
              <p>
                  location name is {this.props.locationName}
              </p>
	          <input
		          value={value}
		          className="location-input"
		          onChange={this.onInputChang}
		          onKeyPress={this.onKeyPress}
	          />
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
