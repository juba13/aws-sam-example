import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  PutCommand,
  DeleteCommand,
  BatchWriteCommand
} from '@aws-sdk/lib-dynamodb'

const REGION = 'REGION' // e.g. "us-east-1"
const dbClient = new DynamoDBClient({ region: REGION })

class DBService {
static save = (tableName, item) => {
  const putParams = { TableName: tableName, Item: { ...item } }
  return dbClient.send(new PutCommand(putParams))
};

static batchSave = (tableName, itemList) => {
  const putBatchParams = {}
  putBatchParams[tableName] = itemList.map((item) => ({
    PutRequest: {
      Item: { ...item }
    }
  }))

  return dbClient.send(new BatchWriteCommand({ RequestItems: putBatchParams }))
}

static getByPk = (tableName, value) => {
  return dbClient.get({ Key: { id: value }, TableName: tableName }).promise()
};
}
export { DBService as db }
