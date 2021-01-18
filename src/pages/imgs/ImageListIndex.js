import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import BingImageList from "../bing/BingImageList";


function AppHomePage() {
	return (
		<div>
			App Home
		</div>
	);
}

function UserSubLayout() {
	return (
		<div>
			User Layout
		</div>
	);
}


function ProductSubLayout() {
	return (
		<div>
			Product Layout
		</div>
	);
}

const renderImgIndex = () => <div>Img Index</div>;


export default class ImageListIndex extends React.PureComponent {
	goToMain = () => {
		const { history } = this.props;
		history.push('/');
	};

	render() {
		const { match } = this.props;
		return (
			<div>
				<p className="main-title">
					Image List Index
				</p>

				<button className="nav_button" onClick={this.goToMain}>
					Go To Main
				</button>

				{/* <div className="nav">
					<NavLink to="/img/index" activeClassName="tab_active">
						Index
					</NavLink>
					<NavLink to="/img/title" activeClassName="tab_active">
						Img Title
					</NavLink>
					<NavLink to="/img/list" activeClassName="tab_active">
						Img list
					</NavLink>
				</div>
				<Switch>
					<Route exact path={`${match.path}/index`} render={renderImgIndex} />
					<Route path={`${match.path}/title`} component={UserSubLayout} />
					<Route path={`${match.path}/list`} component={BingImageList} />
					<Redirect to={`${match.url}/index`} />
				</Switch> */}
			</div>
		)
	}
}
