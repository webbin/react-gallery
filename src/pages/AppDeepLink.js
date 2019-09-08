import React from 'react';


class AppDeepLink extends React.PureComponent {

	testApp = (url) => {
		// let timeout, t = 1000, hasApp = true;
		// setTimeout(function () {
		// 	if (!hasApp) {
		// 		//没有安装微信
		// 		var r=confirm("您没有安装微信，请先安装微信!");
		// 		if (r==true){
		// 			location.href="http://weixin.qq.com/"
		// 		}
		// 	}else{
		// 		//安装微信
		// 	}
		// 	document.body.removeChild(ifr);
		// }, 2000)
		//
		// var t1 = Date.now();
		// var ifr = document.createElement("iframe");
		// ifr.setAttribute('src', url);
		// ifr.setAttribute('style', 'display:none');
		// document.body.appendChild(ifr);
		// timeout = setTimeout(function () {
		//    var t2 = Date.now();
		//    if (!t1 || t2 - t1 < t + 100) {
		//      hasApp = false;
		//    }
		// }, t);
	};

	render() {
		return (
			<div>
				<h2>
					open your app
				</h2>

				<a href="rutiapp://huanpai/playTopic?uid=91092&topicId=0992384234">open client u9 app</a>

				<br/>

				<a href="peopleapp://people/0">open people app</a>

				<br/>

				<a href="weixin://app">open wechat app</a>

				<br/>

				{/*<a href="javascript:testApp('weixin://')" className="dl-btn" id="download">打开微信</a>*/}

				<input type="file" id="file-input" />

				<button id="get-file-btn" onClick="getFile()">get file</button>
			</div>
		);
	}
}
