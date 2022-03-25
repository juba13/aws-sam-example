import {log} from "../../service/log.service.mjs"
import {error} from "../../service/error.service.mjs"
import {db} from "../../service/db.service.mjs"
import {Patient} from "./patient.model.mjs"


export const handler = async (event, context) => {
    log.info(event, context);
    switch (event.httpMethod) {
		case 'DELETE':
			return  deleteItem(event);
		case 'GET':
			return getItem(event);
		case 'POST': 
			return saveItem(event);
		case 'PUT': 
			return updateItem(event);
		default:
			throw error.notFoundError("Method notfound : " +event.httpMethod )
	}
};

const saveItem = (event) => {
	const patient = Patient.create().bindData(JSON.parse(event.body));
	patient.isValid()
	return db.save(patient.getTableName,patient)
}
const getItem = (event) => {
	const itemId = event.pathParameters.id;
	return db.getItem(Patient.create().getTableName(),itemId)
}

const deleteItem = (event) => {
	const itemId = event.pathParameters.id;
	return db.deleteItem(Patient.create().getTableName(),itemId)
}

function updateItem(event, callback) {
	const patient = Patient.create().bindData(JSON.parse(event.body));
	patient.isValid()
	return db.updateItem(patient.getTableName,patient)
}