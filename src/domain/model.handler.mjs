import { Patient } from "./patient/patient.model.mjs";
import { handler as patientHandler } from "./patient/patient.handler.mjs";
import { response } from "../service/response.service.mjs"

const getModelHandeler = (modelName) => {
  switch(modelName){
    case Patient.getModelName() :
      return patientHandler;
    default:
     throw error.notFoundError("model  notfound : " + modelName )   
  } 
} 

export async function handler(event, context) {
    try {
      const handler = getModelHandeler(event.pathParameters.modelName);
      return response.ok(await handler(event)) 
    } catch (e) {
      return response.error(e.stack)
    }
}; 