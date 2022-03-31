import { error } from './service/error.service.mjs'
import { log } from './service/log.service.mjs'
import { response } from './service/response.service.mjs'
import { db } from './service/db.service.mjs'
import { uuid, checkValidation } from './service/common.service.mjs'

const PATIENT_TABLE_NAME = process.env.TABLE_NAME

export const saveHandler = async (event, context) => {
  try {
    let patient = JSON.parse(event.body)
    log.info('Patient Save Start', patient)
    checkValidation(schema, patient)
    patient.id = uuid()
    patient = db.save(PATIENT_TABLE_NAME, patient)
    log.info('Patient Save End', patient)
    return response.success(patient)
  } catch (e) {
    log.error('Patient Save Failed', e.message)
    return response.error(e.stack)
  }
}

export const getHandler = (event, context) => {
  try {
    return response.success(db.getById(PATIENT_TABLE_NAME, event.pathParameters.id))
  } catch (e) {
    return response.error(e)
  }
}

export const deleteHandler = (event, context) => {
  try {
    return response.success(db.deleteItemById(PATIENT_TABLE_NAME, event.pathParameters.id))
  } catch (e) {
    return response.error(e)
  }
}

const schema = {
  type: 'object',
  title: 'The patient infomation input body',
  properties: {
    age: { type: 'integer' },
    fullname: { type: 'string' },
    gender: { type: 'string' },
    email: { type: 'string' },
    address: { type: 'string' }
  },
  required: ['fullname', 'age', 'email']
}

const getPatientFromInput = (input = {}) => {
  return {
    id: input?.id,
    fullname: input?.fullname,
    age: input?.age,
    gender: input?.gender,
    email: input?.email,
    address: input?.address
  }
}
