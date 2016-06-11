describe('acceptance', () => {
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
  `, () => {

    describe('GET /B (a module with no dependencies)', () => {
      it('should resolve a tree containing only B');
    });

    describe('GET /C (a module with only immediate dependencies)', () => {
      it(`should resolve:
            C
            ├── F
            └── G`);
    });

    describe('GET /D (a module with multiple levels of dependencies)', () => {
      it(`should resolve:
            D
            ├─┬ H
            │ ├── F
            │ └── G
            └─┬ I
              ├── J
              └── K`);
    });

    describe('GET /A (a module with multiple levels of common dependencies)', () => {
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
                └── K`);
    });

  });
});
