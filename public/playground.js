const handleOpenURL = (url) => {
		console.log('Initial url is: ', url);
		const splits = url.split('?');
		const [paths, params] = splits;
		const pathSplits = paths.split('/');
		const option = pathSplits[pathSplits.length - 1];
		const paramList = params.split('&');
		console.log('option = ', option);
		// console.log('params = ', paramList);
		const paramObj = {};
		paramList.forEach((str) => {
			const paramSplit = str.split('=');
			const [prop, value] = paramSplit;
			paramObj[prop] = value;
		});
		console.log(paramObj);
		// const route = event.url.replace(/.*?:\/\//g, '');
	};

const url = 'rutiapp://huanpai/playTopic?uid=91092&topicId=0992384234';
// handleOpenURL(url);

const Token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJVLTVjM2JlNTQ1LWRjNDE5ODk2ZjI2NGI0YjctNDc2OSIsImV4cCI6MTU0ODMwNjE2NiwiaXNzIjoiaHBOZXQudXNlckF1dGgifQ.ia7vRTEcLPu92rLZWEGN2qbSjId0UYUCNijgarnxXQYqu3vDbC5NybuqifVDGvuYpNeD-g2oUApDzzbmgMnsI-EpUn65O1OaaBwHn3706by0QULgUdU_FZjc4zUmb3vpMKbOqemksFC5A2WkeKKh1HasWaZBL6hE0C6shuof3nE';
const inputView = document.getElementById("file-input");
const uploadUrl = 'http://188.131.137.16:8082/image-center';

const file = { binary: '' };
const reader = new FileReader();
reader.addEventListener("load", function () {
	file.binary = reader.result;
});
const getFile = () => {
	console.log(inputView.files);

	const form = new FormData();

	const selectFile = inputView.files[0];
	form.append('file', selectFile);



	// We need a separator to define each part of the request
	let boundary = "blob";

	// Store our body request in a string.
	let data = "";

	// So, if the user has selected a file
	if (selectFile) {
		// Start a new part in our body's request
		data += "--" + boundary + "\r\n";

		// Describe it as form data
		data += 'content-disposition: form-data; '
			// Define the name of the form data
			+ 'name="'         + selectFile.name          + '"; '
			// Provide the real name of the file
			+ 'filename="'     + selectFile.name + '"\r\n';
		// And the MIME type of the file
		data += 'Content-Type: ' + selectFile.type + '\r\n';

		// There's a blank line between the metadata and the data
		data += '\r\n';

		// Append the binary data to our body's request
		data += file.binary + '\r\n';
	}

	// Text data is simpler
	// Start a new part in our body's request
	data += "--" + boundary + "\r\n";

	// Say it's form data, and name it
	// data += 'content-disposition: form-data; name="' + text.name + '"\r\n';
	// There's a blank line between the metadata and the data
	data += '\r\n';

	// Append the text data to our body's request
	// data += text.value + "\r\n";

	// Once we are done, "close" the body's request
	data += "--" + boundary + "--";
	console.log(data);

	const options = {};
	options.body = form;
	options.method = 'post';
	options.mode = 'cors';
	options.headers = {
		Authorization: Token,
		mode: 'cors',
		'Content-Type': selectFile.type,
		'content-disposition': 'form-data;' + 'name=' + selectFile.name + ';filename=' + selectFile.name,
	};
	fetch(uploadUrl, options).then((result) => {

	}).catch((err) => {

	})

};
