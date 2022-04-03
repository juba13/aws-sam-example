import { error } from './service/error.service.mjs'
import { log } from './service/log.service.mjs'
import { response } from './service/response.service.mjs'
import { patientInfo } from './service/db.service.mjs'
import {  checkValidation } from './service/common.service.mjs'

const PATIENT_TABLE_NAME = process.env.TABLE_NAME

export const saveHandler = async (event, context) => {
  try {
    let patient = JSON.parse(event.body)
    log.info('Patient Save Start', patient)
    checkValidation(schema, patient)
    patient = await patientInfo.putOne(patient)
    log.info('Patient Save End', patient)
    return response.success(patient)
  } catch (e) {
    log.error('Patient Save Failed', e.message)
    return response.error(e.stack)
  }
}

export const getHandler = async (event, context) => {
  try {
    log.info('Patient get Start', event.pathParameters.id) 
    return response.success(await patientInfo.getItemById("id",event.pathParameters.id))
  } catch (e) {
    log.info('Patient get failed',e.message) 
    return response.error(e)
  }
}


export const getAllHandler = async (event, context) => {
  try {
    log.info('Patient getall Start') 
    return response.success(await patientInfo.getAll())
  } catch (e) {
    log.info('Patient getall failed',e.message) 
    return response.error(e)
  }
}

export const deleteHandler = async (event, context) => {
  try {
    log.info('delete patient start', event.pathParameters.id ) 
    return response.success(await patientInfo.deleteItemById("id",event.pathParameters.id))
  } catch (e) {
    log.info('delete patient failed', e.message) 
    return response.error(e)
  }
}

const schema = {
  type: 'object',
  title: 'The patient infomation input body',
  properties: {
    id: { type: 'string' },
    age: { type: 'integer' },
    fullname: { type: 'string' },
    gender: { type: 'string' },
    email: { type: 'string' },
    address: { type: 'string' }
  },
  required: [ 'id', 'fullname', 'age', 'gender', 'email']
}
