class DependencyTreeBuilder {
  constructor(dependencyResolver) {
    this.dependencyResolver = dependencyResolver;
  }

  buildForPackage(name) {
    const rootNode = { name, dependencies: [] };
    return this._resolve(rootNode)
      .then(() => rootNode);
  }

  _resolve(node) {
    return this.dependencyResolver
      .resolve(node.name)
      .then((depNames) => Promise.all(
        depNames.map((name) => {
          const depNode = { name, dependencies: [] };
          node.dependencies.push(depNode);
          return this._resolve(depNode);
        })
      ));
  }
}

module.exports = DependencyTreeBuilder;
