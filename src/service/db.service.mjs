import { DynamoDB} from 'aws-sdk';
import { error} from '../service/error.service.mjs';
import { log} from '../service/log.service.mjs';
const dynamo = new DynamoDB.DocumentClient();

class DBService{
	
static save =  (tableName , item ) => {
	return  dynamo
	.put({ TableName:tableName, Item:item })
	.promise();
};

static getById = (tableName ,value ) => {
	return dynamo.get({ Key: {id: value},TableName: tableName}).promise();
};

static deleteItemById = async (tableName ,value ) => {
	return dynamo.delete({ Key: {id: value},TableName: tableName}).promise();
};

static updateItem = (tableName ,itemId, item) => {
	
	let vbl = "x";
	let adder = "y";
	let updateexp = 'set ';
	let itemKeys =  Object.keys(item);
	let expattvalues = {};

	for (let i = 0; i < itemKeys.length; i++) {
		vbl = vbl+adder;

		if((itemKeys.length-1)==i)
			updateexp += itemKeys[i] + ' = :'+ vbl;
		else
			updateexp += itemKeys[i] + ' = :'+ vbl + ", ";

		expattvalues[":"+vbl] = item[itemKeys[i]];
	}

	console.log("update expression and expressionAttributeValues");
	console.log(updateexp, expattvalues);

	const params = {
		TableName: tableName,
		Key: {
			id: itemId
		},
		ConditionExpression: 'attribute_exists(id)',
		UpdateExpression: updateexp,
		ExpressionAttributeValues: expattvalues,
		ReturnValues: 'ALL_NEW'
	};

	return dynamo
		.update(params)
		.promise();
};

}

export { DBService as db }