import Ajv from "ajv"
import { ValidationError } from "../lib/AppError.mjs"

const ajv = new Ajv()
export const validate = (schema, data) => {
    const validate = ajv.compile(schema)
    const valid = validate(data)
    if (!valid) {
        throw new ValidationError(validate.errors)
    }
}