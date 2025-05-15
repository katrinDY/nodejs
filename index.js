const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
})

const fileOps = async() => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
    await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you!');
    await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseCompleted.txt'));
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseCompleted.txt'), 'utf8');
    console.log(newData);
  } catch (err) {
    console.log(err);
  } 
}

fileOps();

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you!', (err) => {
  if (err) throw err;
  console.log('Write complete.');

  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), 'Added new text to reply.txt', (err) => {
    if (err) throw err;
    console.log('Added new text to reply.txt.');

    fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
      if (err) throw err;
      console.log('Renamed file to newReply.txt');
    })
  })
})

fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Testing text', (err) => {
  if (err) throw err;
  console.log('Appending successful.');
})

process.on('uncaughtException', err => {
  console.log(`Uncaught error: ${err}`);
  process.exit(1);
})