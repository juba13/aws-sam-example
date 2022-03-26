import {StatusCodes} from 'http-status-codes';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

class AppResponse{
    constructor() {
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


    static ok = (data) => {
      const response = {
        statusCode: 200,
        headers: {
          ...corsHeaders
        },
        body: JSON.stringify({
          ok: true,
          data
        })
      }
      return response
    }
  
    static error = (error, statusCode ) => {
      if (!statusCode) statusCode = error.statusCode || 500
  
      if (error.length) {
        // handle batch of errors
      }
  
      const message = typeof error === 'string'
        ? error
        : error.message
  
      const response = {
        statusCode,
        headers: {
          ...corsHeaders
        },
        body: JSON.stringify({
          ok: false,
          status: statusCode,
          error: message,
          data: typeof error === 'object' ? error?.data : {}
        })
      }
      return response
    }


}

export { AppResponse as response }