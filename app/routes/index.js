const express = require('express');
const router = new express.Router();

const DependencyResolver = require('../../lib/dependency-resolver');
const DependencyTreeBuilder = require('../../lib/dependency-tree-builder');
const errors = require('../../lib/errors');

const resolver = new DependencyResolver();
const treeBuilder = new DependencyTreeBuilder(resolver);

function handlePackageNotFoundError(res) {
  return function (err) {
    if (err instanceof errors.PackageNotFound) {
      res.sendStatus(404);
    } else {
      throw err;
    }
  }
};

router.get('/:packageName', function(req, res) {
  treeBuilder
    .buildForPackage(req.params.packageName)
    .then((dependecyTree) => res.json(dependecyTree))
    .catch(handlePackageNotFoundError(res));
});

router.get('/', function(req, res) {
  res.json({});
});

module.exports = router;
