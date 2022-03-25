import { uuid } from "../../service/common_service.mjs";
import { validate } from "../service/validator.service.mjs";
import { Patient } from "./patient/patient.model.mjs";
import { handler as patientHandler } from "./patient/patient.handler.mjs";
import { response } from "../service/response.service.mjs"

export class Model{
  constructor(tableName , schema) {
    super();
    this.uuid = uuid();
    this.#tableName = tableName;
    this.#schema = schema;
  }

  getTableName = () => {
      return this.#tableName;
  }

  isValid = () =>{
    validate(this.#schema,this)
  }
} 

const getDomainHandeler = (domanName) => {
   switch(domanName){
     case Patient.getModelName :
       return patientHandler;
     default:
      throw error.notFoundError("domain notfound : " + domanName )   
   } 
} 


export async function handler(event, context) {
    try {
      handler = getDomainHandeler(event.pathParameters.modelName)
      const data =  await handler(event);
      return response.ok(data) 
    } catch (e) {
      return response.error(e.message)
    }
};