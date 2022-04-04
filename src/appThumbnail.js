import { log } from './service/log.service.mjs'
import { error } from './service/error.service.mjs'
import { S3 } from 'aws-sdk'
const util = require('util')
const sharp = require('sharp')
// import { blobToURL, urlToBlob, fromBlob, fromURL } from 'image-resize-compress';
// import { Blob } from "buffer";

export const handler = async (event, context) => {
  try {
    log.info('Start thumbnail process ')
    await create_image_thumbnail(event)
  } catch (e) {
    log.error(e.message)
  }
}

const create_image_thumbnail = async (event) => {
  log.info('Reading options from event:\n', util.inspect(event, { depth: 5 }))
  const s3 = new S3()
  const srcBucket = event.Records[0].s3.bucket.name
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))
  const dstBucket = process.env.ThumnilBucket
  const dstKey = 'resized-' + srcKey

  // Infer the image type from the file suffix.
  const typeMatch = srcKey.match(/\.([^.]*)$/)
  if (!typeMatch) {
    throw error.notFoundError('type not found')
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase()
  if (imageType !== 'jpg' && imageType !== 'png') {
    throw error.notSupportedError(imageType + 'not supporte')
  }

  // Download the image from the S3 source bucket.

  try {
    const params = {
      Bucket: srcBucket,
      Key: srcKey
    }
    var origimage = await s3.getObject(params).promise()
  } catch (err) {
    throw error.apiCallError(err.message)
  }

  // set thumbnail width. Resize will set the height automatically to maintain aspect ratio.
  const width = 200

  // // Use the sharp module to resize the image and save in a buffer.
  try {
    var buffer = await sharp(origimage.Body).resize(width).toBuffer()
  } catch (err) {
    throw error.apiCallError(err.message)
  }
  // console.log("Resize Start");
  // fromBlob(new Blob([origimage.Body ]), 80, 200, 120, 'jpeg').then((blob) => {
  //     console.log("Done");
  //     console.log(blob);
  // });

  // Upload the thumbnail image to the destination bucket
  try {
    const destparams = {
      Bucket: dstBucket,
      Key: dstKey,
      Body: buffer,
      ContentType: 'image'
    }

    const putResult = await s3.putObject(destparams).promise()
  } catch (err) {
    throw error.apiCallError(err.message)
  }
  log.info('Successfully resized ' + srcBucket + '/' + srcKey + ' and uploaded to ' + dstBucket + '/' + dstKey)
}
