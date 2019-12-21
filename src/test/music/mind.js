const fs = require('fs');
const RootPath = '../Music/';

const windowsMusicPath = 'Z:\\cloudMusic\\';
const phoneMusicListFile = './MusicList.json';
const windowsMusicListFile = './WindowsMusicList.json';


const transformFileSizeString = (byteSize) => {
	if (byteSize < 0) {
		return '0';
	}
	if (byteSize < 1024) {
		return `${byteSize}B`;
	}
	const M = 1024 * 1024;
	if (byteSize < M) {
		const s = byteSize / 1024;
		return `${s.toFixed(2)}K`;
	}
	const bs = byteSize / M;
	return `${bs.toFixed(2)}M`;
};

const statFile = (musicDir, fileName, showStatResult = false) => {
	const p = `${musicDir}${fileName}`;
	const result = fs.statSync(p);
	if (showStatResult) console.log('result = ', result);
	const {
		size,
	} = result;
	return {
		size: transformFileSizeString(size),
		fileName,
	};

};


const readMusicListAndWriteToFile = (musicDir, jsonFile) => {
  const AllData = [];
  fs.readdir(musicDir, {}, (err, files) => {
		// const { length } = files;
		const fn = files[0];
		// console.log(statFile(musicDir, fn, true));
		files.forEach((f) => {
		  if (f.endsWith('.mp3')) {
        const item = statFile(musicDir, f);
        AllData.push(item);
      }
		});
		console.log('length = ', AllData.length);
		fs.writeFileSync(jsonFile, JSON.stringify(AllData), {encoding: 'utf-8'});
	});
};


const readWindowsMusic = () => {
	readMusicListAndWriteToFile(windowsMusicPath, windowsMusicListFile);
};

const readPhoneMusic = () => {
	readMusicListAndWriteToFile(phoneMusicListFile, windowsMusicListFile);
};

readWindowsMusic();

