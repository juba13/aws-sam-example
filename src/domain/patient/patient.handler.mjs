import {log} from "../../service/log.service.mjs"
import {error} from "../../service/error.service.mjs"
import {db} from "../../service/db.service.mjs"
import {Patient} from "./patient.model.mjs"


export const handler = async (event, context) => {
   log.info(event, context);
	switch (event.httpMethod) {
		case 'DELETE':
			return  deleteItemById(event);
		case 'GET':
			return  getItemById(event);
		case 'POST': 
			return  saveItem(event);
		case 'PUT': 
			return  updateItem(event);
		default:
			throw error.notFoundError("Method notfound : " +event.httpMethod )
	}
};

const saveItem = (event) => {
	const patient = Patient.create().bindData(JSON.parse(event.body));
	patient.checkValidation().generateId();
	return  db.save(patient.getTableName(),patient);
}
const getItemById =  (event) => {
	const itemId = event.pathParameters.modelId;
	return  db.getById(Patient.create().getTableName(),itemId);
}

const deleteItemById =  (event) => {
	const itemId = event.pathParameters.id;
	return  db.deleteItemById(Patient.create().getTableName(),itemId)
}

const updateItem =  (event) => {
	const patient = Patient.create().bindData(JSON.parse(event.body));
	patient.checkValidation();
	if(patient.id?.length>0){
		return  db.updateItem(patient.getTableName(),patient.id,patient)
	} else{
		throw error.notFoundError("id not found");
	}
}