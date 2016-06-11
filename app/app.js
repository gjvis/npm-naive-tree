const express = require('express');
const errorHandlers = require('./error-handlers');
const logger = require('./logger');
const routes = require('./routes/index');

const app = express();

app.use(logger(app.get('env')));

app.use('/', routes);

errorHandlers.init(app);

module.exports = app;
