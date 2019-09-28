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

			<FileList />

			<div
				style={{
					marginBottom: 30,
				}}
			>
				<button
					className="nav_button"
					onClick={() => {
						history.push('/img');
					}}
				>
					Go To Image List
				</button>
				<button
					className="nav_button"
					onClick={() => {
						history.push('/basic');
					}}
				>
					Go To Basic
				</button>
			</div>
			<div className="nav">
				<NavLink
					to="/main/location"
					activeClassName="tab_active"
				>
					AppLocation
				</NavLink>
				<NavLink
					to="/main/time"
					activeClassName="tab_active"
				>
					AppTime
				</NavLink>
				<NavLink
					activeClassName="tab_active"
					to="/main/config"
				>
					AppConfig
				</NavLink>
			</div>
			<Switch>
				<Route exact path={`${match.path}/location`} component={LocationView}/>
				<Route path={`${match.path}/time`} component={TimeView}/>
				<Route
					path='/main/config'
					render={() => {
						return (
							<div>
								Main Config
							</div>
						);
					}}
				/>
				<Redirect to={`${match.path}/location`}/>
			</Switch>
		</div>
	);
};

export default main;
