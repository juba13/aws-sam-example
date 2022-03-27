import { response } from "../service/response.service.mjs";
import { file_upload_signed_url } from "../service/s3.service.mjs";


export const handler = async (event, context) => {
    try {

      switch (event.httpMethod) {
        case 'GET':
          return response.ok(await file_upload_signed_url(event)) 
        case 'OPTIONS': 
          return response.ok("ok") 
        default:
          throw error.notFoundError("Method notfound : " +event.httpMethod )
      }
      
    } catch (e) {
      return response.error(e.stack)
    }
}; 
