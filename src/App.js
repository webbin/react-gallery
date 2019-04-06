import React, {Component} from 'react';
import FileList from "./fileManage/FileList";
import logo from './logo.svg';
import './App.css';
import {songHistory} from './network/config';
import ImageFileList from "./test/ImageFileList";
import TimeView from "./test/TimeView";
import LocationView from "./test/LocationView";

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
		const options = {
			headers: {
				// 'cache-control': 'no-cache',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
				'Accept-Encoding': ' gzip, deflate, br',
				'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
				'Hose': 'www.baidu.com',

			},
			mode: 'no-cors',
		};
		const url = 'http://www.baidu.com';
		const mendium = 'https://www.medium.com';
		fetch(url, options).then((result) => {
			// console.log(result.text());
			return result.text();

		}).then((result) => {
			console.log(result);
		}).catch((err) => {
			console.log(err);
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
			<h1 className='off-work-title'>距离下班还有</h1>
			<h1 className='count-down-text'>{this.state.countDown.hour}小时{this.state.countDown.minute}分钟{this.state.countDown.second}秒</h1>
		</div>
	);


	render() {
		const hour = this.state.hour > 12 ? `下午${this.state.hour - 12}时` : `上午${this.state.hour}时`;
		return (
			<div className='App'>
				<p
					className='time-hint-text'
					onClick={this.fetchMedium}
				>
					现在是 {this.state.year}年{this.state.month}月{this.state.day}日
					{hour}{this.state.minute}分{this.state.second}秒
				</p>


				<TimeView />
				<LocationView />
				{/*{this.state.countDown ? this.renderCountDown() : <p className='off-work-title'>解放了解放了</p>}*/}
			</div>
		);
	}
}

export default App;
