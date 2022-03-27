import { config, S3} from 'aws-sdk';
const URL_EXPIRATION_SECONDS = 300

export const file_upload_signed_url = async (event) => {
    config.update({ region: process.env.AWS_REGION })
    const s3 = new S3()
    const randomID = parseInt(Math.random() * 10000000)
    // const Key = `${randomID}.jpg`
    const Key = 'f478247384.jpg'
  
    // Get signed URL from S3
    const s3Params = {
      Bucket: process.env.UploadBucket,
      Key: Key,
      Expires: URL_EXPIRATION_SECONDS,
      ContentType: 'image/jpeg'
      // for publicly readable
      // ACL: 'public-read'
    }
  
    console.log('AWS_REGION: ', process.env.AWS_REGION )
    console.log('Params: ', s3Params)
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
    return {uploadURL: uploadURL,Key}
  }