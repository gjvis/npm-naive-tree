# npm-naive-tree

Generate npm dependency trees, ignoring versions.

**NOTE**: This is a coding exercise, and is not intended for use!

## API
### GET /\<package name>
Returns an [npm] dependency tree for the named package in JSON format.

## Usage (With Docker)
### Prerequisites
- [Docker]
- [Docker Compose]

### Installation
Clone the repository:
```sh
$ git clone https://github.com/gjvis/npm-naive-tree.git
```

### Run web server
To start a web-server on `http://localhost:3000`:
```sh
$ docker-compose up
```

**NOTE**: If you are using [Docker Machine] then the server will be available at port 3000 on the IP
address of your docker-machine. You can find the IP address by running:
```sh
$ docker-machine ip <docker-machine name>
```

### Run tests
Run all tests with:
```sh
$ docker-compose run web npm test
```

## Usage (Without Docker)
### Prerequisites
- [Node.js] 6
- [Redis]
- [npm]

### Installation
Clone the repository:
```sh
$ git clone https://github.com/gjvis/npm-naive-tree.git
```

Setup the application:
```sh
$ npm install
```

### Run web server
Ensure that a [Redis] server is running, then start the web server with:
```sh
$ npm start
```

### Run tests
Ensure that a [Redis] server is running, then run all tests with:
```sh
$ npm test
```

## Configuration
The following environment variables can be used to configure the application:
- `PORT` - the port that the web server listens on (default `3000`)
- `NPM_REGISTRY_HOST` - the npm registry used to lookup package dependencies (default `https://registry.npmjs.org`)
- `REDIS_URL` - the url of the Redis server used for caching (default `redis://localhost:6379`, url schema details at [IANA].)

## License

[ISC](LICENSE)

[Docker]: https://www.docker.com/
[Docker Compose]: https://www.docker.com/products/docker-compose
[Docker Machine]: https://www.docker.com/products/docker-machine
[Node.js]: https://nodejs.org
[npm]: https://www.npmjs.com/
[Redis]: http://redis.io/
[IANA]: http://www.iana.org/assignments/uri-schemes/prov/redis
