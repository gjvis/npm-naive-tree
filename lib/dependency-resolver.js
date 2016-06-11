const request = require('request-promise');
const errors = require('./errors');

function handlePackageNotFound(name) {
  return function (err) {
    if (err && err.statusCode && err.statusCode === 404) {
      throw new errors.PackageNotFound(name);
    } else {
      throw err;
    }
  };
}

class DependencyResolver {
  // TODO: centralize environmental config
  constructor(registryHost = (process.env.NPM_REGISTRY_HOST || 'https://registry.npmjs.org')) {
    this.registryHost = registryHost;
  }

  resolve(name) {
    return request({ uri: this._uri(name), json: true })
      .then((body) => Object.keys(body.dependencies || []))
      .catch(handlePackageNotFound(name));
  }

  _uri(name) {
    return `${this.registryHost}/${name}/latest`;
  }

}

module.exports = DependencyResolver;
