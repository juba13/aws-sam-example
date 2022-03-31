import { v4 as uuidv4 } from 'uuid'
import Ajv from 'ajv'
import { error } from './error.service.mjs'
import { log } from './log.service.mjs'
export { StatusCodes } from 'http-status-codes'
const ajv = new Ajv()

export const uuid = () => {
  return uuidv4()
}

export const checkValidation = (schema, data) => {
  const validate = ajv.compile(schema)
  const valid = validate(data)
  if (!valid) {
    log.warn('Invalid patient data ', data)
    throw error.validationError(ajv.errorsText(validate.errors))
  }
  return valid
}
