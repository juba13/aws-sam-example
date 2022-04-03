import { create_image_thumbnail } from './service/s3.service.mjs'
import { log } from './service/log.service.mjs'

export const handler = async (event, context) => {
  try {
    log.info("Start thumbnail process ")
    await create_image_thumbnail(event)
  } catch (e) {
    log.error(e.message)
  }
}
