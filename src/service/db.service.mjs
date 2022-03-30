import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand,
	UpdateCommand,
	GetCommand,
	QueryCommand,
	DeleteCommand,
	BatchGetCommand,
	BatchWriteCommand,
  } from "@aws-sdk/lib-dynamodb";


  const REGION = "REGION"; //e.g. "us-east-1"
  const dbClient = new DynamoDBClient({ region: REGION });  


class DBService{
	
static save =  (tableName , item ) => {
	const putParams = { TableName: tableName,Item: { ...item }};
	return dbClient.send(new PutCommand(putParams));
};


static batchSave = (tableName , itemList) => {
	const putBatchParams = {};
	putBatchParams[tableName] = itemList.map(( item) => ({
	  PutRequest: {
		Item: { ...item },
	  },
	}));
  
    return ddbDocClient.send(
	  new BatchWriteCommand({ RequestItems: putBatchParams })
	);
}


static getByPk = (tableName , value ) => {
	return dynamo.get({ Key: {id: value},TableName: tableName}).promise();
};

static deleteById = async (tableName ,value ) => {
	const prams = { TableName: tableCache,Key: { correlationId: id}};
	return dbClient.send(new DeleteCommand(prams));
};


// static query = async ({ IndexName, KeyConditionExpression, ExpressionAttributeValues }) => {
//     const queryParams = {
//       TableName,
//       IndexName,
//       KeyConditionExpression,
//       ExpressionAttributeValues
//     };
//     const { Items } = await ddbDocClient.send(new QueryCommand(queryParams))
//     return Items;
//   };
// }





// export function updateSmsRequest({ correlationId, messageId, report }) {
// 	const updateParams = {
// 	  TableName: tableCache,
// 	  Key: { correlationId },
// 	  UpdateExpression: `SET report=:r, messageId=:messageId REMOVE #n, message`,
// 	  ExpressionAttributeNames: {
// 		"#n": "number",
// 	  },
// 	  ExpressionAttributeValues: {
// 		":r": report,
// 		":messageId": messageId,
// 	  },
// 	};
  
// 	return ddbDocClient.send(new UpdateCommand(updateParams));
//   }
  



// static updateItem = (tableName ,itemId, item) => {
	
// 	let vbl = "x";
// 	let adder = "y";
// 	let updateexp = 'set ';
// 	let itemKeys =  Object.keys(item);
// 	let expattvalues = {};

// 	for (let i = 0; i < itemKeys.length; i++) {
// 		vbl = vbl+adder;

// 		if((itemKeys.length-1)==i)
// 			updateexp += itemKeys[i] + ' = :'+ vbl;
// 		else
// 			updateexp += itemKeys[i] + ' = :'+ vbl + ", ";

// 		expattvalues[":"+vbl] = item[itemKeys[i]];
// 	}

// 	console.log("update expression and expressionAttributeValues");
// 	console.log(updateexp, expattvalues);

// 	const params = {
// 		TableName: tableName,
// 		Key: {
// 			id: itemId
// 		},
// 		ConditionExpression: 'attribute_exists(id)',
// 		UpdateExpression: updateexp,
// 		ExpressionAttributeValues: expattvalues,
// 		ReturnValues: 'ALL_NEW'
// 	};

// 	return dynamo
// 		.update(params)
// 		.promise();
// };

}

export { DBService as db }

