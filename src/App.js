import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {songHistory} from './network/config';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			result: '',
		};
	}

	componentDidMount() {
		this.getSongHistories();

	}

	getSongHistories = () => {
		// ?uid=32953014&type=1
		const url = `${songHistory}?uid=264181895&type=1`;
		// const url = 'https://www.baidu.com';
		const options = {
			method: 'GET',
			headers: {
				// 'content-type': 'application/json',
				"Accept-Encoding": 'gzip, deflate, br',
				"Accept-Language": 'zh-CN,zh;q=0.9,en;q=0.8',
				Connection: 'keep-alive',
				"User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
			}
		};
		fetch(url, options).then(result => {
			// console.log(result);
			const reader = result.body.getReader();

			let resultString = '';
			let time = 0;
			let length = 0;
			const handleArray = ({ done, value}) => {
				if (done) {
					console.log('done, value = null');
					return;
				}
				time += 1;
				length += value.length;
				console.log('this value length = ', length);
				const jsonString = this.utf8ByteToUnicodeStr(value);
				console.log('json string = ', jsonString);
				resultString += jsonString;

				return reader.read().then(handleArray);
			};

			reader.read().then(handleArray)
				.then(() => {
					// const data = JSON.parse(resultString);
					// console.log('data = ', data);
				});


		}).catch(err => console.log(err));
	};

	/**
	 * utf8 byte to unicode string
	 * @param utf8Bytes
	 * @returns {string}
	 */
	utf8ByteToUnicodeStr = (utf8Bytes) => {
		let unicodeStr = "";
		for (let pos = 0; pos < utf8Bytes.length;){
			const flag= utf8Bytes[pos];
			let unicode = 0;
			if ((flag >>>7) === 0 ) {
				unicodeStr+= String.fromCharCode(utf8Bytes[pos]);
				pos += 1;

			} else if ((flag &0xFC) === 0xFC ){
				unicode = (utf8Bytes[pos] & 0x3) << 30;
				unicode |= (utf8Bytes[pos+1] & 0x3F) << 24;
				unicode |= (utf8Bytes[pos+2] & 0x3F) << 18;
				unicode |= (utf8Bytes[pos+3] & 0x3F) << 12;
				unicode |= (utf8Bytes[pos+4] & 0x3F) << 6;
				unicode |= (utf8Bytes[pos+5] & 0x3F);
				unicodeStr+= String.fromCharCode(unicode) ;
				pos += 6;

			}else if ((flag &0xF8) === 0xF8 ){
				unicode = (utf8Bytes[pos] & 0x7) << 24;
				unicode |= (utf8Bytes[pos+1] & 0x3F) << 18;
				unicode |= (utf8Bytes[pos+2] & 0x3F) << 12;
				unicode |= (utf8Bytes[pos+3] & 0x3F) << 6;
				unicode |= (utf8Bytes[pos+4] & 0x3F);
				unicodeStr+= String.fromCharCode(unicode) ;
				pos += 5;

			} else if ((flag &0xF0) === 0xF0 ){
				unicode = (utf8Bytes[pos] & 0xF) << 18;
				unicode |= (utf8Bytes[pos+1] & 0x3F) << 12;
				unicode |= (utf8Bytes[pos+2] & 0x3F) << 6;
				unicode |= (utf8Bytes[pos+3] & 0x3F);
				unicodeStr+= String.fromCharCode(unicode) ;
				pos += 4;

			} else if ((flag &0xE0) === 0xE0 ){
				unicode = (utf8Bytes[pos] & 0x1F) << 12;
				unicode |= (utf8Bytes[pos+1] & 0x3F) << 6;
				unicode |= (utf8Bytes[pos+2] & 0x3F);
				unicodeStr+= String.fromCharCode(unicode) ;
				pos += 3;

			} else if ((flag &0xC0) === 0xC0 ){ //110
				unicode = (utf8Bytes[pos] & 0x3F) << 6;
				unicode |= (utf8Bytes[pos+1] & 0x3F);
				unicodeStr+= String.fromCharCode(unicode) ;
				pos += 2;

			} else{
				unicodeStr+= String.fromCharCode(utf8Bytes[pos]);
				pos += 1;
			}
		}
		return unicodeStr;
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>

			</div>
		);
	}
}

export default App;
