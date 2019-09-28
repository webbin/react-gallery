import React from 'react';

import imageData from './image-data-string';
import requireData from './page-require-image-string';
import './tree-style.css';

export default class ImageFileList extends React.PureComponent {
	constructor(props) {
		super(props);

		// const obj = JSON.parse(string);
		// console.log(imageData);
		// console.log(requireData);
		this.matchUsedImage();
	}



	matchUsedImage = () => {
		requireData.forEach((item) => {
			const [jsPath] = Object.keys(item);
			const imageList = item[jsPath];
			imageList.forEach((imgPathString) => {
				const pathList = imgPathString.split('/');

				let obj = imageData;
				for (let i = 1; i < pathList.length; i += 1) {
					const pathName = pathList[i];
					if (obj) {
						obj = obj[pathName]
					}
				}
				if (obj && obj instanceof Object) {
					const {
						isFile
					} = obj;
					if (isFile) obj.used = true;
				}
			});
		});
	};

	renderImageFileData = (data, name, layer) => {
		let prefix = '';
		for (let i = 0; i < layer; i += 1) {
			prefix += '--/';
		}
		if (data instanceof Object) {
			const {
				isFile,
				used
			} = data;
			if (isFile) {
				const key = `${layer}-${name}`;
				const sty = used ? 'file_used' : 'file';
				return ( <
					p className = {
						sty
					}
					key = {
						key
					} > {
						prefix
					}
					file: {
						name
					} <
					/p>
				);

			} else {
				const list = [];
				const pathNameList = Object.keys(data);
				pathNameList.forEach((pathName, index) => {
					const child = data[pathName];
					const result = this.renderImageFileData(child, `/${pathName}`, layer + 1);
					list.push(result);
				});
				return ( <
					div key = {
						name
					}
					className = "item" > {
						name
					} {
						list
					} <
					/div>
				);
			}
		}
		return null;
	};


	render() {
		return ( <
			div className = "root" >
			this is image file tree {
				this.renderImageFileData(imageData, '/images', 0)
			} <
			/div>
		);
	}
}