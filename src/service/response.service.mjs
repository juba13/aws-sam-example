import { StatusCodes } from 'http-status-codes'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

class AppResponse {
 static response = (data = {}, error, statusCode = '200') => {
   let body = {}
   const response = {
     statusCode,
     headers: {
       ...corsHeaders
     }
   }
   if (statusCode === '200') {
     body = { ok: true, data }
   } else {
     const message = typeof error === 'string' ? error : error.message
     body = {
       ok: false,
       status: statusCode,
       error: message,
       data: typeof error === 'object' ? error?.data : {}
     }
   }
   response.body = JSON.stringify(body)
   return response
 }

  static success = (data) => { return AppResponse.response(data) };
  static error = (error, statusCode = '500') => { return AppResponse.response(null, error, statusCode) }
}
export { AppResponse as response }
