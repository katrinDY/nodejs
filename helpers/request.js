const { emitter } = require('../helpers/emit');
const fs = require('fs');
const fsPromises = fs.promises;

function getReqExtension (extension) {
  let contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html'
  }
  
  return contentType;
}

const serveFile = async (filePath, contentType, res) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes('image') ? 'utf-8' : ''
    );
    const isContentTypeJSON = contentType === 'application/json';
    const data = isContentTypeJSON
      ? JSON.parse(rawData)
      : rawData;
    res.writeHead(
      filePath.includes('404.html') ? 400 : 200,
      { 'Content-Type': contentType });
    res.end(
      isContentTypeJSON
        ? JSON.stringify(data)
        : data 
    );
  } catch (err) {
    console.error(err);
    emitter.emit('log', `${err.name}\t${err.message}`, 'errLog.txt');

    res.statusCode = 500;
    res.end();
  }
}

module.exports = {
  getReqExtension,
  serveFile
};