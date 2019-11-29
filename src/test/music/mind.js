
const fs = require('fs');
const RootPath = '../Music/';

let AllData = [];

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

const statFile = (fileName) => {
  const p = `${RootPath}${fileName}`;
  const result = fs.statSync(p);
  // console.log('result = ', result);
  const {
    size,

  } = result;
  return {
    size: transformFileSizeString(size),
    fileName,
  };

};

fs.readdir(RootPath, {}, (err, files) => {
  // const { length } = files;
  const fn = files[0];
  // console.log(statFile(fn));
  files.forEach((f) => {
    const item = statFile(f);
    AllData.push(item);
  });


  console.log('length = ', AllData.length);

  fs.writeFileSync('./MusicList.json', JSON.stringify(AllData), { encoding: 'utf-8' });
});



