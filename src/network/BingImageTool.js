


export default class BingImageTool {
	constructor(pageSize = 10) {

		this.size = pageSize;

		this.host = '119.23.245.96';
		// localhost
	}


	getUrl = (index, size = 10) => {
		console.log(' get url, index = ', index);
		return `http://${this.host}:10052/imgList?index=${index}&size=${size}`;
	};

	fetchImageList = async (index, size) => {
		const config = {
			method: "GET",
			mode: "cors",
			headers:{
				'Accept':'application/json,text/plain,*/*'
			}
		};
		const result = await fetch(this.getUrl(index, size || this.size), config);
		// console.log(' get bing image list result = ', result);
		return result.json();
	};
}
