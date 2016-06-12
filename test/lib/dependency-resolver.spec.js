const expect = require('../support/expect');
const errors = require('../../lib/errors');

const DependencyResolver = require('../../lib/dependency-resolver');

describe('DependencyResolver', function () {
  const underTest = new DependencyResolver();

  describe('resolve', function () {
    it('returns first-order dependencies as a json list, with no version numbers', function () {
      return expect(underTest.resolve('gjvis-fixture-a'))
        .to.eventually.deep.equal([
          'gjvis-fixture-b',
          'gjvis-fixture-c',
          'gjvis-fixture-d',
          'gjvis-fixture-e',
        ]);
    });

    it('throws a PackageNotFound error for non-existent packages', function () {
      return expect(underTest.resolve('non-existent-package'))
        .to.be.rejectedWith(errors.PackageNotFound)
    });
  });

  describe('registryHost', function () {
    it('defaults to https://registry.npmjs.org', function () {
      expect(underTest.registryHost).to.equal('https://registry.npmjs.org');
    });
  });
});
