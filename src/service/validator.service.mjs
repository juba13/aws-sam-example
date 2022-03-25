import Ajv from "ajv"
import { error } from "./error.service.mjs"
const ajv = new Ajv()
export const validate = (schema, data) => {
    const validate = ajv.compile(schema)
    const valid = validate(data)
    if (!valid) {
        throw error.validationError(validate.errors)
    }
}