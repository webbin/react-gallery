const fs = require('fs');

const phoneMusicListFile = './MusicList.json';
const windowsMusicListFile = './WindowsMusicList.json';

const phoneMusicList = require('./MusicList');
const windowsMusicList = require('./WindowsMusicList');


const compareList = () => {
	console.log('phone music list = ', phoneMusicList.length);
	console.log('windows music list = ', windowsMusicList.length);

	const sameList = [];
	const phoneMusicDiffList = [];
	const windowsMusicDiffList = [];
	const phoneMusicMap = new Map();

	phoneMusicList.forEach((item, index) => {
		const {fileName} = item;
		phoneMusicMap.set(fileName, index);
	});


	windowsMusicList.forEach((item) => {
		const {fileName} = item;
		if (phoneMusicMap.has(fileName)) {
			const index = phoneMusicMap.get(fileName);
			const sameItem = phoneMusicList[index];
			sameList.push(sameItem);
			phoneMusicMap.delete(fileName);
		} else {
			windowsMusicDiffList.push(item);
		}
	});

	console.log('same count = ', sameList.length);
	console.log('phone music diff map size = ', phoneMusicMap.size);
	console.log('windows music diff count = ', windowsMusicDiffList.length);

	const its = phoneMusicMap.values();
	let itItem = its.next();
	console.log(itItem.value);
	while (itItem && !itItem.done) {
		const index = itItem.value;
		phoneMusicDiffList.push(phoneMusicList[index].fileName);
		itItem = its.next();
	}
	console.log('phone music diff length =  ', phoneMusicDiffList.length);
	fs.writeFileSync('PhoneDiffList.json', JSON.stringify(phoneMusicDiffList));
};


compareList();
