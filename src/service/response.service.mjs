import {StatusCodes} from 'http-status-codes';
class AppResponse{
    constructor() {
      super();
    }
    static create = () => { 
      return new AppResponse();
    } 

    addBody = (body) => {
      this.body= body;
      return this;
    } 

    addStatusCode = (statusCode) => {
      this.statusCode= statusCode;
      return this;
    } 
    static ok = (body) => { return AppResponse.create().addBody(body).addStatusCode(StatusCodes.OK)}
    static error = (body,code) => { return AppResponse.create().addBody(body).addStatusCode(code?.startsWith("2"))? StatusCodes.INTERNAL_SERVER_ERROR : code}
}

export { AppResponse as response }