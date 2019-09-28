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

	increasePrice = () => {

		this.setState((state) => {
			const { contextData: { price } } = state;
			return { contextData: { price: price + 1 } };
		})
	};

	renderItem = (item, index) => {
		return (
			<FileItem
				key={index}
			/>
		)
	};

	renderChangeButton = () => {
		return (
			<div>
				<button onClick={this.increasePrice}>
					add context value
				</button>
			</div>
		)
	};

	render() {
		return (
			<FileContext.Provider value={this.state.contextData}>
				<div style={styles.file_list}>
					{this.renderChangeButton()}
					this is file list
					{this.files.map(this.renderItem)}
				</div>
			</FileContext.Provider>
		)
	}
}
