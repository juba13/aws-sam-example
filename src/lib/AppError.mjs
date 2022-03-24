import { ErrorSeverity, ErrorType, ErrorLevel } from '.'

export class AppError extends Error {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }
  toString () {
    return `${this.name}: ${this.message} ${JSON.stringify(this.meta)}`
  }
}

export class ExternalAPIError extends AppError {
  name = 'ExternalAPIError'
  constructor (message, meta) {
    super(message)
    this.meta = meta
    this.errorType = ErrorType.ExternalApiError
  }
}



export class InputMessageError extends CollectorError {
  name = 'InputMessageError'

  constructor (message, meta) {
    super(message)
    this.meta = meta
  }
}

export class InvalidDataFormat extends CollectorError {
  name = 'InvalidDataFormat'
  constructor (message, meta) {
    super(message)
    this.meta = meta
  }
}


export class TokenError extends CollectorError {
  name = 'TokenError'

  constructor (message, meta) {
    super(message)
    this.meta = meta
    this.errorType = ErrorType.TokenError
    this.severity = ErrorSeverity.Recoverable
    this.errorLevel = ErrorLevel.Account
    Error.captureStackTrace(this, this.constructor)
  }
}

export class TokenNotFoundError extends TokenError {
  name = 'TokenNotFoundError'

  constructor (message, meta) {
    super(message, meta)
    this.severity = ErrorSeverity.Irrecoverable
    this.errorLevel = ErrorLevel.Account
    Error.captureStackTrace(this, this.constructor)
  }
}

export class DBError extends CollectorError {
    constructor (message, meta) {
    super(message)
    this.name = 'DBError'
    this.severity = ErrorSeverity.Recoverable
    this.meta = meta
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends CollectorError {
  name = 'ValidationError'

  constructor (message, meta) {
    super(message)
    this.severity = ErrorSeverity.Irrecoverable
    this.meta = meta
    Error.captureStackTrace(this, this.constructor)
  }
}

export class IrrecoverableDBError extends DBError {
  name = 'IrrecoverableDBError'

  constructor (message, meta) {
    super(message, meta)
    this.severity = ErrorSeverity.Irrecoverable
    this.meta = meta
    this.errorLevel = ErrorLevel.Object
    Error.captureStackTrace(this, this.constructor)
  }
}

export const ErrorSeverity = Object.freeze({
  Recoverable:   Symbol(1),
  Irrecoverable:  Symbol(2)
});

export const ErrorType = Object.freeze({
  ExternalApiError : Symbol(1),
  DbError : Symbol(2),
  TokenError : Symbol(3)
});

export const ErrorLevel = Object.freeze({
  NORMAL : Symbol(1),
  MEDIUM : Symbol(2),
  HIGH : Symbol(3),
  FIRE : Symbol(4)
});

export class ErrorMeta {
  constructor (level, type, severity, error) {
    this.errorName = error.name
    this.errorMessage = error.message
    this.errorLevel = level
    this.errorType = type
    this.errorSeverity = severity
  }
}
