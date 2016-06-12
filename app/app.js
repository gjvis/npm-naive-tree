const express = require('express');
const errorHandlers = require('./error-handlers');
const logger = require('./logger');
const dependencyTrees = require('./dependency-trees');

const app = express();

app.use(logger(app.get('env')));

app.use('/', dependencyTrees);

errorHandlers.init(app);

module.exports = app;
