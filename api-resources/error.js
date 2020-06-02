// Yayson does not support errors, so roll our own.
// Refer to <https://jsonapi.org/format/#errors> on what is valid to add.

class ErrorPresenter {
  constructor(errors) {
    this.errors = errors;
  }

  toJSON() {
    return {
      errors: this.errors,
    };
  }
}

module.exports = { ErrorPresenter };
