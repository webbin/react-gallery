
import React from 'react';
import './Bing.css';
import BingImageTool from "../../network/BingImageTool";

export default class BingImageList extends React.PureComponent {
	constructor(props) {
		super(props);

		this.fetchTool = new BingImageTool();

		this.state = {
			list: [],
		};

		this.index = 0;



	}

	componentDidMount() {
		this.getImageList();
		this.addScrollListener();
		this.listLengthScrollEnd = 0;
	}

	componentWillUnmount() {
		this.removeScrollListener();
	}

	getImageList = () => {
		this.fetchTool.fetchImageList(this.index)
			.then((result) => {
				// console.log(' get bing image list = ', result);
				const { images } = result;

				const list = [];
				images.forEach((item) => {
					const { url } = item;
					list.push({
						...item,
						url: `https://www.bing.com${url}`,
					});
				});
				console.log(' get bing image list = ', list);
				this.pushList(list);
				this.index += list.length;
			})
			.catch((err) => {
				console.log(' get bing image list error = ', err);
			});
	};

	pushList = (next) => {
		if (!next || !next.length) return;
		this.setState((state) => {
			const { list } = state;
			const l = list.concat(next);
			return { list: l };
		});
	};

	onScrollToEnd = () => {
		console.log('container scroll to end ');
		this.getImageList();
	};

	addScrollListener = () => {
		window.addEventListener('scroll', this.onContainerScroll);
	};

	removeScrollListener = () => {
		window.removeEventListener('scroll', this.onContainerScroll)
	};

	generateScrollListener = () => {
		let invokeTime = 0;
		console.log(' generate scroll listener ======== ', invokeTime);

		return (event) => {
			console.log(' invoke scroll ======== ', invokeTime);
			if (invokeTime % 30 === 0) {
				this.onContainerScroll(event);
			}
			invokeTime += 1;
		};
	};

	onContainerScroll = (event) => {
		// console.log('container scroll ', event);
		if (event.target && event.target.documentElement) {
			const { scrollHeight, scrollTop, clientHeight } = event.target.documentElement;
			// console.log('container scroll height = ', scrollHeight,
			// 	', scroll top = ', scrollTop,
			// 	' client height = ', clientHeight,
			// );
			if (scrollTop === 0) {
				console.log('container scroll to top ');
			} else if (scrollTop + clientHeight >= scrollHeight) {
				// console.log('container scroll to bottom ');
				if (this.listLengthScrollEnd !== this.state.list.length) {
					this.onScrollToEnd();
					this.listLengthScrollEnd = this.state.list.length;
				}
			}
		}
	};

	onImageClick = (item, index) => () => {
		const { history } = this.props;
		history.push(`/imgDetail/bing/${index}`);
	};

	renderImageCell = (item, index) => {
		if (!item) return null;
		const { url, copyright } = item;
		return (
			<div key={`${index}`} onClick={this.onImageClick(item, index)}>
				<img className="image" alt={url} src={url} />
				<p className="image_copyright">
					{copyright}
				</p>
			</div>
		);
	};

	renderGrid = () => {
		const { list } = this.state;
		return (
			<div className="img_container" onScroll={this.generateScrollListener()}>
				{list.map(this.renderImageCell)}
			</div>
		)
	};

	render() {
		return (
			<div>
				<a>
					Bing pictures
				</a>
				{this.renderGrid()}
			</div>
		);
	}
}
