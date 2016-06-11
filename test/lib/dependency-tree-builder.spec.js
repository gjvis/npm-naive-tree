const expect = require('../support/expect');
const sinon = require('sinon');

const DependencyResolver = require('../../lib/dependency-resolver');
const DependencyTreeBuilder = require('../../lib/dependency-tree-builder');

describe('DependencyTreeBuilder', () => {
  let depedencyResolver;
  let underTest;

  beforeEach(() => {
    depedencyResolver = sinon.createStubInstance(DependencyResolver);

    // return no dependencies by default
    depedencyResolver.resolve
      .returns(Promise.resolve([]));

    underTest = new DependencyTreeBuilder(depedencyResolver);
  })

  describe('buildForPackage', () => {
    context('given a package with no dependencies', () => {
      it('returns a tree with no dependencies', () => {
        depedencyResolver.resolve
          .withArgs('foo')
          .returns(Promise.resolve([]));

        return expect(underTest.buildForPackage('foo'))
          .to.eventually.deep.equal({ name: 'foo', dependencies: [] });
      });
    });

    context('given a package with only first-order dependencies', () => {
      it('returns a tree of the package\'s dependencies', () => {
        depedencyResolver.resolve
          .withArgs('foo')
          .returns(Promise.resolve(['bar', 'baz']));

        return expect(underTest.buildForPackage('foo'))
          .to.eventually.deep.equal(
            {
              name: 'foo',
              dependencies: [
                { name: 'bar', dependencies: [] },
                { name: 'baz', dependencies: [] },
              ],
            }
          );
      });
    });

    context('given a package with multiple levels of nested dependencies', () => {
      it('returns a tree of the package\'s dependencies', () => {
        depedencyResolver.resolve
          .withArgs('foo')
          .returns(Promise.resolve(['bar', 'baz']));

        depedencyResolver.resolve
          .withArgs('bar')
          .returns(Promise.resolve(['wibble', 'wobble']));

        return expect(underTest.buildForPackage('foo'))
          .to.eventually.deep.equal(
            {
              name: 'foo',
              dependencies: [
                {
                  name: 'bar',
                  dependencies: [
                    { name: 'wibble', dependencies: [] },
                    { name: 'wobble', dependencies: [] },
                  ],
                },
                { name: 'baz', dependencies: [] },
              ],
            }
          );
      });
    });

  });
});
