import React from 'react';


export default class BingImageDetail extends React.PureComponent {

	componentDidMount() {
		const { match: { params } } = this.props;
	}

	render() {
		const { match: { params } } = this.props;
		return (
			<div>
				<p>Params Type: {params.type}</p>
				<p>Params Url: {params.url}</p>
			</div>
		);
	}
}
