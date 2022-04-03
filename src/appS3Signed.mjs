import { response } from './service/response.service.mjs'
import { file_upload_signed_url } from './service/s3.service.mjs'
import { log } from './service/log.service.mjs'
import { error } from './service/error.service.mjs'

export const handler = async (event, context) => {
  try {
    log.info("Call for signed s3 path " ,event.pathParameters.ref)
    return response.success(await file_upload_signed_url(event.pathParameters.ref))
  } catch (e) {
    return response.error(e.stack)
  }
}
