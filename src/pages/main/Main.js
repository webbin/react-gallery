import React from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'

import './main.css';
import TimeView from "../../test/TimeView";
import LocationView from "../../test/LocationView";
import FileList from '../../fileManage/FileList';

class Main extends React.PureComponent {
	componentDidMount() {
		console.log(' props in main page ', this.props);
	}

	goToImageListIndex = () => {
		const {history} = this.props;
		history.push('/imgs');
	};

	goToBasic = () => {
		const {history} = this.props;
		history.push('/basic');
	};

	render() {
		// const {match, history } = this.props;
		// console.log(' link path = ', `${match.path}/location`);
		return null;
	}
}


const main = ({ match, history }) => {
	// console.log(match);
	// console.log(' math path = ', match.path, ' , match url ', match.url);
	return (
		<div>
			<span className="main-title">
				Main Page
			</span>
		</div>
	);
};

export default main;
