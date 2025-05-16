const http = require('http');
const path = require('path');
const fs = require('fs');
const { getReqExtension, serveFile } = require('./helpers/request');
const { emitter } = require('./helpers/emit');

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  emitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

  const extensionPath = path.extname(req.url);
  const extension = getReqExtension(extensionPath);
  const isExtensionText = extension === 'text/html';
  let filePath;

  if(isExtensionText && req.url === '/') {
    filePath = path.join(__dirname, 'views', 'index.html');
  } else if (isExtensionText && req.url.slice(-1) === '/') {
    filePath = path.join(__dirname, 'views', req.url, 'index.html');
  } else if (isExtensionText) {
    filePath = path.join(__dirname, 'views', req.url);
  } else {
    filePath = path.join(__dirname, req.url);
  }

  if (!extensionPath && req.url.slice(-1) !== '/') filePath += '.html';

  if(fs.existsSync(filePath)) {
    serveFile(filePath, extension, res);
  } else {
    switch(path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { 'Location': '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { 'Location': '/' });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
})

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))