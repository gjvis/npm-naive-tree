const expect = require('../support/expect');
const uuid = require('node-uuid');

const DependencyCache = require('../../lib/dependency-cache');

describe('DependencyCache', function () {
  it('stores dependencies, keyed by package name', function () {
    const package = `example-package ${uuid.v4()}`;
    const dependencies = ['red', 'orange', 'yellow', 'green'];

    const cache = new DependencyCache();

    return expect(
      cache
        .store(package, dependencies)
        .then(() => cache.fetch(package))
    ).to.eventually.deep.equal(dependencies);
  });

  specify('cache instances share a persistent backend', function () {
    const package = `example-package ${uuid.v4()}`;
    const dependencies = ['blue', 'indigo', 'violet'];

    const cache1 = new DependencyCache();
    const cache2 = new DependencyCache();
    const cache3 = new DependencyCache();

    return expect(
      cache1
        .store(package, dependencies)
        .then(() =>
          Promise.all([
            cache1.fetch(package),
            cache2.fetch(package),
            cache3.fetch(package),
          ])
        )
    ).to.eventually.deep.equal([
      dependencies,
      dependencies,
      dependencies
    ]);
  });
});
