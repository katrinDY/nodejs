const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    const logsDir = path.join(__dirname, '../../files/logs')
    const eventLogsPath = path.join(`${logsDir}/${logName}`)
    if(!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
      await fsPromises.writeFile(eventLogsPath, logItem, (err) => {
        if (err) {
          console.error(err);
        }
      })
    }
    await fsPromises.appendFile(eventLogsPath, logItem)
  } catch (err) {
    console.error(err);
  }
}

module.exports = logEvents;