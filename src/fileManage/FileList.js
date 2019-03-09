import React from 'react';

import styles from './file-style.css';
import FileItem from "./FileItem";

import FileContext from './FileContext';

export default class FileList extends React.Component {
	constructor(props) {
		super(props);

		this.files = new Array(10).fill('item');

		this.state = {
			contextData: { price: 22 },
		};
	}

	renderItem = (item, index) => {

		return (
			<FileItem
				key={index}
			/>
		)
	};

	render() {
		return (
			<FileContext.Provider value={this.state.contextData}>
				<div style={styles.file_list}>
					this is file list
					{this.files.map(this.renderItem)}
				</div>
			</FileContext.Provider>
		)
	}
}
