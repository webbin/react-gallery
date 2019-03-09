import React from 'react';

import styles from './file-style.css';

import FileContext from './FileContext';

export default class FileItem extends React.Component {

	renderItem = (value) => {
		console.log('render item ', value);
		return (
			<p style={styles.file_item}>
				this is file item
			</p>
		);
	};

	render() {
		return (
			<FileContext.Consumer>
				{this.renderItem}
			</FileContext.Consumer>
		)
	}
}
