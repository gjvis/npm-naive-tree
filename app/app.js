const express = require('express');
const errorHandlers = require('./error-handlers');
const logger = require('morgan');
const routes = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use('/', routes);

errorHandlers.init(app);

module.exports = app;
