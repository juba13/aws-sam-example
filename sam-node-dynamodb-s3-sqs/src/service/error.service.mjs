class AppError extends Error {
  constructor (message, errorName) {
    super(message)
    this.errorName = errorName
    Error.captureStackTrace(this, this.constructor)
  }

  toString () {
    return `${this.errorName}: ${this.message} }`
  }

  static validationError = (message) => { return new AppError(message, 'validationError') }
  static tokenError = (message) => { return new AppError(message, 'tokenError') }
  static dbError = (message) => { return new AppError(message, 'tokenError') }
  static notFoundError = (message) => { return new AppError(message, 'notFoundError') }
  static notSupportedError = (message) => { return new AppError(message, 'notSupportedError') }
  static apiCallError = (message) => { return new AppError(message, 'apiCallError') }
  static unknownError = (message) => { return new AppError(message, 'unknownError') }
}

export { AppError as error }
