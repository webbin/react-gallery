import React from 'react';


type CommonListProps = {
	list: Array,
	renderItem: () => React.ReactNode,
	onScrollToEnd: () => void,
};

class CommonList extends React.PureComponent<CommonListProps> {
	constructor(props) {
		super(props);

	}

	componentDidMount(): void {

	}

	componentWillUnmount(): void {

	}


	render() {
		const { renderItem, list } = this.props;
		if (!list) return null;
		return list.map(renderItem);
	}
}
