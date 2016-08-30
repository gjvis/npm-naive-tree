class DependencyTreeBuilder {
  constructor(dependencyResolver) {
    this.dependencyResolver = dependencyResolver;
    this.promisedDeps = new Map();
  }

  buildForPackage(name) {
    const rootNode = { name, dependencies: [] };
    return this._expand(rootNode)
      .then(() => rootNode);
  }

  _expand(node) {
    return this.dependencyResolver
      .resolve(node.name)
      .then((depNames) => Promise.all(
        depNames.map((name) => this._attachAndExpand(name, node))
      ));
  }

  _attachAndExpand(name, node) {
    let promisedDep = this.promisedDeps.get(name);

    if (!promisedDep) {
      // we haven't seen this package on this graph yet
      const depNode = { name, dependencies: [] };
      promisedDep = {
        node: depNode,
        promise: this._expand(depNode), // expand the node!
      };
      this.promisedDeps.set(name, promisedDep);
    }

    node.dependencies.push(promisedDep.node); // attach it to the graph
    return promisedDep.promise;
  }
}

module.exports = DependencyTreeBuilder;
