class AppError extends Error {
  constructor (message) {
    super(message)
    this.addCode("500")
    Error.captureStackTrace(this, this.constructor)
  }  
  addName = (name) =>{
    this.errorName = name;
    return this;
  } 
  addCode = (code) =>{
    this.errorCode= code;
    return this;
  }

  toString () {
    return `${this.errorName}: ${this.message} }`
  }

  static create(message){
    return new AppError(message) 
  }  

  static validationError = (message) => { return AppError.create(message).addName("validationError") }
  static tokenError = (message) => { return AppError.create(message).addName("tokenError") }
  static dbError = (message) => { return AppError.create(message).addName("tokenError") }
  static notFoundError = (message) => { return AppError.create(message).addName("notFoundError") }
  static notSupportedError = (message) => { return AppError.create(message).addName("notSupportedError") }
  static apiCallError = (message) => { return AppError.create(message).addName("apiCallError") }
  static unknownError = (message) => { return AppError.create(message).addName("unknownError") }
}

export { AppError as error}





