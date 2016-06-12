const CachingDependencyResolver = require('../../lib/caching-dependency-resolver');
const DependencyCache = require('../../lib/dependency-cache');
const DependencyResolver = require('../../lib/dependency-resolver');
const DependencyTreeBuilder = require('../../lib/dependency-tree-builder');
const errors = require('../../lib/errors');

const cache = new DependencyCache();
const resolver = new DependencyResolver();
const cachingResolver = new CachingDependencyResolver(resolver, cache);
const treeBuilder = new DependencyTreeBuilder(cachingResolver);

function handlePackageNotFoundError(res) {
  return function (err) {
    if (err instanceof errors.PackageNotFound) {
      res.sendStatus(404);
    } else {
      throw err;
    }
  }
};

function show(req, res) {
  treeBuilder
    .buildForPackage(req.params.packageName)
    .then((dependecyTree) => res.json(dependecyTree))
    .catch(handlePackageNotFoundError(res));
}

function index(req, res) {
  res.json({});
}

module.exports = {
  index,
  show
};
