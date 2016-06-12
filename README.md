# npm-naive-tree

Generate npm dependency trees, ignoring versions.

**NOTE**: This is a coding exercise, and is not intended for use!

## Prerequisites
- [Node.js] 6
- [Redis]
- [npm]

## Installation
Clone the repository:
```sh
$ git clone https://github.com/gjvis/npm-naive-tree.git
```

Setup the application:
```sh
$ npm install
```

## Usage
### API
#### GET /\<package name>
Returns an [npm] dependency tree for the named package in JSON format.

### Web server
Ensure that a [Redis] server is running, then start the web server with:
```sh
$ npm start
```

The following environment variables can be used to configure the application:
- `PORT` - the port that the web server listens on (default `3000`)
- `NPM_REGISTRY_HOST` - the npm registry used to lookup package dependencies (default `https://registry.npmjs.org`)
- `REDIS_URL` - the url of the Redis server used for caching (default `redis://localhost:6379`, url schema details at [IANA].)

## Development
Run all tests with:
```sh
$ npm test
```

Note: tests require a [Redis] server to be available.

## License

[ISC](LICENSE)

[Node.js]: https://nodejs.org
[npm]: https://www.npmjs.com/
[Redis]: http://redis.io/
[IANA]: http://www.iana.org/assignments/uri-schemes/prov/redis
