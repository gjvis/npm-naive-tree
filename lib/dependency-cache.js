const redisClient = require('./redis-client');

function keyName(name) {
  return `pkg:${name}`;
}

class DependencyCache {
  fetch(name) {
    return redisClient
      .get(keyName(name))
      .then((reply) => JSON.parse(reply));
  }

  store(name, dependencies) {
    return redisClient
      .set(keyName(name), JSON.stringify(dependencies));
  }
}

module.exports = DependencyCache;
