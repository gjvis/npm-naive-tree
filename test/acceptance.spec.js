const app = require('../app/app');
const request = require('supertest-as-promised');

describe('acceptance', function () {
  context(`Given the following module structure:
      A
      ├── B
      ├─┬ C
      │ ├── F
      │ └── G
      ├─┬ D
      │ ├─┬ H
      │ │ ├── F
      │ │ └── G
      │ └─┬ I
      │   ├── J
      │   └── K
      └─┬ E
        └─┬ I
          ├── J
          └── K
  `, function () {

    describe('GET /B (a module with no dependencies)', function () {
      it('should resolve a tree containing only B', function () {
        return request(app)
          .get('/gjvis-fixture-b')
          .expect(200)
          .expect({
            name: 'gjvis-fixture-b',
            dependencies: [],
          });
      });
    });

    describe('GET /C (a module with only immediate dependencies)', function () {
      it(`should resolve:
            C
            ├── F
            └── G`, function () {
        return request(app)
          .get('/gjvis-fixture-c')
          .expect(200)
          .expect({
            name: 'gjvis-fixture-c',
            dependencies: [
              { name: 'gjvis-fixture-f', dependencies: [] },
              { name: 'gjvis-fixture-g', dependencies: [] },
            ],
          });
      });
    });

    describe('GET /D (a module with multiple levels of dependencies)', function () {
      it(`should resolve:
            D
            ├─┬ H
            │ ├── F
            │ └── G
            └─┬ I
              ├── J
              └── K`, function () {
        return request(app)
          .get('/gjvis-fixture-d')
          .expect(200)
          .expect({
            name: 'gjvis-fixture-d',
            dependencies: [
              {
                name: 'gjvis-fixture-h',
                dependencies: [
                  { name: 'gjvis-fixture-f', dependencies: [] },
                  { name: 'gjvis-fixture-g', dependencies: [] },
                ],
              },
              {
                name: 'gjvis-fixture-i',
                dependencies: [
                  { name: 'gjvis-fixture-j', dependencies: [] },
                  { name: 'gjvis-fixture-k', dependencies: [] },
                ],
              },
            ],
          });
      });
    });

    describe('GET /A (a module with multiple levels of common dependencies)', function () {
      it(`should resolve:
            A
            ├── B
            ├─┬ C
            │ ├── F
            │ └── G
            ├─┬ D
            │ ├─┬ H
            │ │ ├── F
            │ │ └── G
            │ └─┬ I
            │   ├── J
            │   └── K
            └─┬ E
              └─┬ I
                ├── J
                └── K`, function () {
        return request(app)
          .get('/gjvis-fixture-a')
          .expect(200)
          .expect({
            name: 'gjvis-fixture-a',
            dependencies: [
              {
                name: 'gjvis-fixture-b',
                dependencies: [],
              },
              {
                name: 'gjvis-fixture-c',
                dependencies: [
                  { name: 'gjvis-fixture-f', dependencies: [] },
                  { name: 'gjvis-fixture-g', dependencies: [] },
                ],
              },
              {
                name: 'gjvis-fixture-d',
                dependencies: [
                  {
                    name: 'gjvis-fixture-h',
                    dependencies: [
                      { name: 'gjvis-fixture-f', dependencies: [] },
                      { name: 'gjvis-fixture-g', dependencies: [] },
                    ],
                  },
                  {
                    name: 'gjvis-fixture-i',
                    dependencies: [
                      { name: 'gjvis-fixture-j', dependencies: [] },
                      { name: 'gjvis-fixture-k', dependencies: [] },
                    ],
                  },
                ],
              },
              {
                name: 'gjvis-fixture-e',
                dependencies: [
                  {
                    name: 'gjvis-fixture-i',
                    dependencies: [
                      { name: 'gjvis-fixture-j', dependencies: [] },
                      { name: 'gjvis-fixture-k', dependencies: [] },
                    ],
                  },
                ],
              },
            ],
          });
      });
    });

  });

  describe('GET /non-existent-package (a non-existent npm package) ', function () {
    it('should return 404 not found', function () {
      return request(app)
        .get('/non-existent-package')
        .expect(404);
    });
  });
});
