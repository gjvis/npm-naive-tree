const redis = require('redis');

// TODO: better lifecycle management, requiring this file connects to Redis!
// TODO: centralize environment variable access
const client = redis.createClient(process.env.REDIS_URL);

module.exports = {
  get(key) {
    return new Promise((resolve, reject) => {
      client.get(
        key,
        (err, reply) => { (err) ? reject(err) : resolve(reply); }
      );
    });
  },

  set(key, value) {
   return new Promise((resolve, reject) => {
      client.set(
        key,
        value,
        (err, reply) => { (err) ? reject(err) : resolve(reply); }
      );
    });
  }
}
