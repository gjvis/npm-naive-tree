const express = require('express');
const errorHandlers = require('./error-handlers');
const fs = require('fs');
const logger = require('morgan');
const path = require('path');
const routes = require('./routes/index');

const app = express();

// Do not log to stdout when testing
if (app.get('env') === 'test') {
  const logStream = fs.createWriteStream(
    path.join(__dirname, '..', 'logs', 'test.log'), { flags: 'w' });
  app.use(logger('tiny', { stream: logStream }));
} else {
  app.use(logger('dev'));
}

app.use('/', routes);

errorHandlers.init(app);

module.exports = app;
