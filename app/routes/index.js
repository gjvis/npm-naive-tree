const express = require('express');
const router = new express.Router();

const DependencyResolver = require('../../lib/dependency-resolver');
const DependencyTreeBuilder = require('../../lib/dependency-tree-builder');

const resolver = new DependencyResolver();
const treeBuilder = new DependencyTreeBuilder(resolver);

router.get('/:packageName', function(req, res) {
  treeBuilder
    .buildForPackage(req.params.packageName)
    .then((dependecyTree) => res.json(dependecyTree));
});

router.get('/', function(req, res) {
  res.json({});
});

module.exports = router;
