import { config, S3 } from 'aws-sdk'
import { log } from './log.service.mjs'

const URL_EXPIRATION_SECONDS = 300

export const file_upload_signed_url = async (ref) => {
  config.update({ region: process.env.AWS_REGION })
  const s3 = new S3()
  const randomID = parseInt(Math.random() * 10000000)
  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key: ref,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  }

  log.info('AWS_REGION: ', process.env.AWS_REGION)
  log.info('Params: ', s3Params)
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
  return { uploadURL: uploadURL, ref }
}


