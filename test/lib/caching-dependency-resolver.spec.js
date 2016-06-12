const expect = require('../support/expect');
const sinon = require('sinon');

const CachingDependencyResolver = require('../../lib/caching-dependency-resolver');
const DependencyCache = require('../../lib/dependency-cache');
const DependencyResolver = require('../../lib/dependency-resolver');

describe('CachingDependencyResolver', () => {
  describe ('resolve', () => {
    const package = 'example-package';
    const dependencies = ['foo', 'bar', 'baz'];

    let innerResolver;
    let cache;
    let underTest;

    beforeEach(() => {
      innerResolver = sinon.createStubInstance(DependencyResolver);
      cache = sinon.createStubInstance(DependencyCache);

      // return empty/cache-miss results by default
      innerResolver.resolve.returns(Promise.resolve([]));
      cache.fetch.returns(Promise.resolve(null));
      cache.store.returns(Promise.resolve());

      underTest = new CachingDependencyResolver(innerResolver, cache);
    });

    it('fetches uncached dependencies from its inner resolver', () => {
      innerResolver.resolve.withArgs(package).returns(Promise.resolve(dependencies));

      return expect(underTest.resolve(package)).to.eventually.equal(dependencies);
    });

    it('stores dependencies fetched from its inner resolver in the cache', () => {
      innerResolver.resolve.withArgs(package).returns(Promise.resolve(dependencies));

      return underTest.resolve(package).then(() =>
        expect(cache.store).to.have.been.calledWith(package, dependencies)
      );
    });

    it('returns subsequent requests for a package from the cache', () => {
      cache.fetch.withArgs(package).returns(Promise.resolve(dependencies));

      return expect(underTest.resolve(package)).to.eventually.equal(dependencies);
    });

  });
});
