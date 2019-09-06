


export default class BingImageTool {
	constructor(pageSize = 10) {

		this.index = 0;
		this.size = pageSize;
	}


	getUrl = (index, size = 10) => {
		return `http://localhost:10052/imgList?index=${index}&size=${size}`;
	};

	fetchImageList = async () => {
		const config = {
			method: "GET",
			mode: "cors",
			headers:{
				'Accept':'application/json,text/plain,*/*'
			}
		};
		const result = await fetch(this.getUrl(this.index, this.size), config);
		console.log(' get bing image list result = ', result);
		this.index += 1;
		return result.json();
	};
}
