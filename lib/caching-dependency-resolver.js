class CachingDependencyResolver {
  constructor(resolver, cache) {
    this.resolver = resolver;
    this.cache = cache;
  }

  resolve(name) {
    return this.cache
      .fetch(name)
      .then((cached) => {
        if (cached) return cached;

        let dependencies;
        return this.resolver.resolve(name)
          .then((resolvedDependencies) => {
            dependencies = resolvedDependencies;
            return this.cache.store(name, dependencies);
          })
          .then(() => dependencies);
      });
  }
}

module.exports = CachingDependencyResolver;
