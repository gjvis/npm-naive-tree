class PackageNotFound extends Error {
  constructor(packageName) {
    const message = `Package "${packageName}" not found`;
    super(message);
    this.message = message;
    this.name = 'PackageNotFound';
  }
}

module.exports = {
  PackageNotFound,
};
