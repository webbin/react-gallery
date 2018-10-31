import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {songHistory} from './network/config';

class App extends Component {

	constructor(props) {
		super(props);

		const date = new Date();
		const offTime = new Date();
		offTime.setHours(17, 30, 0);
		this.offWorkTime = offTime.getTime();

		this.state = {
			result: '',
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate(),
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds(),
			countDown: this.getCountDown(),
		};


	}

	fetchMedium = () => {
		fetch('https://www.medium.com').then((result) => {
			console.log(result);

		});
	};

	getCountDown = () => {
		const date = new Date();

		const currentTime = date.getTime();
		const delta = Math.ceil((this.offWorkTime - currentTime) / 1000);
		let countDown = { hour: 0, minute: 0, second: 0 };
		if (delta > 0) {
			const h = Math.floor(delta / 3600);
			const min = Math.floor((delta - h * 3600) / 60);
			const sec = Math.floor((delta - h * 3600 - min * 60));
			countDown = {
				hour: h, minute: min, second: sec,
			};
		} else {
			countDown = null;
		}

		return countDown;
	};

	componentDidMount() {
		setInterval(() => {
			const date = new Date();
			this.setState((preState) => {
				const currentTime = date.getMilliseconds();
				const delta = this.offWorkTime - currentTime;

				const nextState = {
					hour: date.getHours(),
					minute: date.getMinutes(),
					second: date.getSeconds(),
				};
				nextState.countDown = this.getCountDown();


				return nextState;
			});
		}, 1000);
	}

	renderCountDown = () => (
		<div>
			<h1 className="off-work-title">距离下班还有</h1>
			<h1 className="count-down-text">{this.state.countDown.hour}小时{this.state.countDown.minute}分钟{this.state.countDown.second}秒</h1>
		</div>
	);


	render() {

		const hour = this.state.hour > 12 ? `下午${this.state.hour - 12}时` : `上午${this.state.hour}时`;
		return (
			<div className="App">
				<p className="time-hint-text" onClick={this.fetchMedium}> 现在是 {this.state.year}年{this.state.month}月{this.state.day}日  {hour}{this.state.minute}分{this.state.second}秒 </p>

				{this.state.countDown ? this.renderCountDown() : <p className="off-work-title">解放了解放了</p>}
			</div>
		);
	}
}

export default App;
