const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

module.exports = (env) => {
  if (env === 'test') {
    // Do not log to stdout when testing
    const logStream = fs.createWriteStream(
      path.join(__dirname, '..', 'logs', 'test.log'), { flags: 'w' });
    return morgan('tiny', { stream: logStream });
  } else {
    return morgan('dev');
  }
};
