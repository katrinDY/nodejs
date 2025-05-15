const fs = require('fs');
const readableStream = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8'});
const writeableStream = fs.createWriteStream('./files/new-lorem.txt');

readableStream.on('data', (dataChunk) => {
  writeableStream.write(dataChunk)
})

readableStream.pipe(writeableStream)