const logEvents = require('./base');
const EventEmitter = require('events');

class LogEventEmitter extends EventEmitter {};

const logEventEmitter = new LogEventEmitter();
logEventEmitter.on('log', (msg) => logEvents(msg));
setTimeout(() => {
  logEventEmitter.emit('log', 'Log event emitted!')
}, 2000);