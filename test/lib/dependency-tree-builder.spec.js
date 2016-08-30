const expect = require('../support/expect');
const sinon = require('sinon');

const DependencyResolver = require('../../lib/dependency-resolver');
const DependencyTreeBuilder = require('../../lib/dependency-tree-builder');

describe('DependencyTreeBuilder', function () {
  let depedencyResolver;
  let underTest;

  beforeEach(function () {
    depedencyResolver = sinon.createStubInstance(DependencyResolver);

    // return no dependencies by default
    depedencyResolver.resolve
      .returns(Promise.resolve([]));

    underTest = new DependencyTreeBuilder(depedencyResolver);
  })

  describe('buildForPackage', function () {
    context('given a package with no dependencies', function () {
      it('returns a tree with no dependencies', function () {
        depedencyResolver.resolve
          .withArgs('foo')
          .returns(Promise.resolve([]));

        return expect(underTest.buildForPackage('foo'))
          .to.eventually.deep.equal({ name: 'foo', dependencies: [] });
      });
    });

    context('given a package with only first-order dependencies', function () {
      it('returns a tree of the package\'s dependencies', function () {
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

    context('given a package with multiple levels of nested dependencies', function () {
      it('returns a tree of the package\'s dependencies', function () {
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

    context('given a package with common nested dependencies', function () {
      it('common dependencies are respresented by the same node object', function () {
        depedencyResolver.resolve
          .withArgs('foo')
          .returns(Promise.resolve(['bar', 'baz']));

        depedencyResolver.resolve
          .withArgs('bar')
          .returns(Promise.resolve(['wibble', 'wobble', 'baz']));

        return underTest.buildForPackage('foo').then(tree => {
          const left = tree.dependencies.find(d => d.name == 'baz');
          const right = tree.dependencies.find(d => d.name == 'bar')
                            .dependencies.find(d => d.name == 'baz');
          expect(left).to.equal(right);
        });
      });
    });

  });
});
