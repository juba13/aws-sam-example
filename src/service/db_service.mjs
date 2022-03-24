import { DynamoDB} from 'aws-sdk';
const dynamo = new AWS.DynamoDB.DocumentClient();

export const save = async (tableName , item ) => {
    dynamo.put({ TableName:table, Item:item }, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
    });
};

export const get = async (tableName , key,value ) => {
	return dynamo
		.get({ Key: {key: value},TableName: tableName})
		.promise()
		.then((result) => {
			return result.Item;
		}, (error) => {
			return error;
		});
};

export const deleteItem = async (tableName , key,value ) => {
    return dynamo.delete((tableName , key,value )).promise();
};

module.exports.updateItem = (itemId, item) => {
	
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
		TableName: TABLE_NAME,
		Key: {
			productId: itemId
		},
		ConditionExpression: 'attribute_exists(productId)',
		UpdateExpression: updateexp,
		ExpressionAttributeValues: expattvalues,
		ReturnValues: 'ALL_NEW'
	};

	return dynamo
		.update(params)
		.promise()
		.then(response => {
			return response.Attributes;
		}, (error) => {
			return error;
		});
};