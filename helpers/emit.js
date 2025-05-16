const EventEmitter = require('events');
const logEvents = require('../events/log/base');

class Emitter extends EventEmitter {};
const emitter = new Emitter();
emitter.on('log', (msg, fileName) => logEvents(msg, fileName))

module.exports = { emitter };