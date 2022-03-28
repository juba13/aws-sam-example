import {config, S3} from 'aws-sdk';
import {util} from 'util';
import {log} from './log.service.mjs';
import {error} from './error.service.mjs';


const URL_EXPIRATION_SECONDS = 300

export const file_upload_signed_url = async (event) => {
    config.update({ region: process.env.AWS_REGION })
    const s3 = new S3()
    const randomID = parseInt(Math.random() * 10000000)
    const Key = `${randomID}.jpg`
    // const Key = 'f478247384.jpg'
  
    // Get signed URL from S3
    const s3Params = {
      Bucket: process.env.UploadBucket,
      Key: Key,
      Expires: URL_EXPIRATION_SECONDS,
      ContentType: 'image/jpeg'
      // for publicly readable
      // ACL: 'public-read'
    }
  
    log.info('AWS_REGION: ', process.env.AWS_REGION )
    log.info('Params: ', s3Params)
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
    return {uploadURL: uploadURL,Key}
  }

export const create_image_thumbnail = async (event) => {
  log.info("Reading options from event:\n", util.inspect(event, {depth: 5}));
  const sharp = require('sharp');
  const s3 = new S3();
  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  const dstBucket = process.env.ThumnilBucket;
  const dstKey    = "resized-" + srcKey;

  // Infer the image type from the file suffix.
  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
      throw error.notFoundError("type not found")
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase();
  if (imageType != "jpg" && imageType != "png") {
    throw error.notSupportedError(imageType + "not supporte")
  }

  // Download the image from the S3 source bucket.

  try {
      const params = {
          Bucket: srcBucket,
          Key: srcKey
      };
      var origimage = await s3.getObject(params).promise();

  } catch (err) {
    throw error.apiCallError(err.message)
  }

  // set thumbnail width. Resize will set the height automatically to maintain aspect ratio.
  const width  = 200;

  // Use the sharp module to resize the image and save in a buffer.
  try {
      var buffer = await sharp(origimage.Body).resize(width).toBuffer();
  } catch (error) {
    throw error.apiCallError(err.message)
  }

  // Upload the thumbnail image to the destination bucket
  try {
      const destparams = {
          Bucket: dstBucket,
          Key: dstKey,
          Body: buffer,
          ContentType: "image"
      };

      const putResult = await s3.putObject(destparams).promise();

  } catch (err) {
    throw error.apiCallError(err.message)
  }
  log.info('Successfully resized ' + srcBucket + '/' + srcKey +' and uploaded to ' + dstBucket + '/' + dstKey);
};
            