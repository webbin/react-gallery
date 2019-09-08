
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
	}

	componentDidMount() {

		this.fetchTool.fetchImageList()
			.then((result) => {
				console.log(' get bing image list = ', result);
				const { images } = result;

				const list = [];
				images.forEach((item) => {
					const { url } = item;
					list.push({
						...item,
						url: `https://www.bing.com${url}`,
					});
				});
				this.setState({ list });

			})
			.catch((err) => {
				console.log(' get bing image list error = ', err);
			});

	}

	renderImageCell = (item, index) => {
		if (!item) return null;
		const { url } = item;
		return (
			<img alt={url} key={`${index}`} src={url} />
		)
	};

	renderGrid = () => {
		const { list } = this.state;
		return (
			<div>
				{this.renderImageCell(list[0], 0)}
				{this.renderImageCell(list[1], 1)}
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
