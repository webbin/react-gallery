import React from 'react'
import { withRouter } from 'react-router-dom'

// import './MockBrowser.css';

class MockBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			path: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount() {
		this.setState({ path: this.props.location.pathname })
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		this.setState({ path: newProps.location.pathname })
	}

	onChange(e) {
		this.setState({ path: e.target.value });
	}

	onKeyPress(e) {
		if (e.key === 'Enter') {
			this.props.history.push(this.state.path)
		}
	}

	render() {
		const { goForward, goBack } = this.props.history;
		const { location: { pathname } } = this.props;

		return (
			<div className="mock-browser">
				<nav>
					<button className="outline" onClick={goBack}>◀︎</button>{' '}
					<button className="outline" onClick={goForward}>▶</button>
				</nav>
				<div className="path">
					<div>http://webbin.cn</div>
					<div>
						<input
							className="mock-browser-input"
							value={this.state.path}
							onChange={this.onChange}
							onKeyPress={this.onKeyPress}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(MockBrowser);
