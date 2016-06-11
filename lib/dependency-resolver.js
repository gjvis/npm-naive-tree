const request = require('request-promise');

class DependencyResolver {
  // TODO: centralize environmental config
  constructor(registryHost = (process.env.NPM_REGISTRY_HOST || 'https://registry.npmjs.org')) {
    this.registryHost = registryHost;
  }

  resolve(name) {
    return request({ uri: this._uri(name), json: true })
      .then((body) => Object.keys(body.dependencies || []));
  }

  _uri(name) {
    return `${this.registryHost}/${name}/latest`;
  }
}

module.exports = DependencyResolver;
