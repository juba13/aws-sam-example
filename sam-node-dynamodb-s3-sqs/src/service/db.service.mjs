import { captureAWSv3Client } from 'aws-xray-sdk'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  GetCommand,
  QueryCommand,
  DeleteCommand,
  BatchGetCommand,
  ScanCommand,
  BatchWriteCommand
} from '@aws-sdk/lib-dynamodb'

import { PATIENT_TABLE_NAME, STAGE, LOCAL_PATIENT_TABLE_ENDPOINT, REGION } from './config.service.mjs'
import { log } from './log.service.mjs'
import { error } from './error.service.mjs'

const dbConfig = { region: REGION }
if (STAGE === 'development') {
  dbConfig.endpoint = 'http://172.17.0.1:8000'
}
log.info('DB CONFIG ', dbConfig)
const dbClient = captureAWSv3Client(new DynamoDBClient({}))
class DynamoDb {
  constructor (tableName) {
    this.tableName = tableName
  }

  putOne = async (item) => {
    const putParams = { TableName: this.tableName, Item: { ...item } }
    return await dbClient.send(new PutCommand(putParams))
  };

  putBatch = (tableName, itemList) => {
    const putBatchParams = {}
    putBatchParams[this.tableName] = itemList.map((item) => ({
      PutRequest: {
        Item: { ...item }
      }
    }))

    return dbClient.send(new BatchWriteCommand({ RequestItems: putBatchParams }))
  };

  getItemById = async (idName, value) => {
    const keyPram = {}
    keyPram[idName] = value
    const params = {
      TableName: this.tableName,
      Key: keyPram
    }
    const item = (await dbClient.send(new GetCommand(params))).Item
    if (Object.keys(item).length === 0) {
      throw error.notFoundError('Item not found in ' + this.tableName)
    }

    return item
  }

 deleteItemById = (idName, value) => {
   const keyPram = {}
   keyPram[idName] = value
   const params = {
     TableName: this.tableName,
     Key: keyPram
   }
   return dbClient.send(new DeleteCommand(params))
 }

getAll = async () => {
  const params = { TableName: this.tableName }
  return (await dbClient.send(new ScanCommand(params)))?.Items
};

 query = async ({
   IndexName,
   KeyConditionExpression,
   ExpressionAttributeValues
 }) => {
   const queryParams = {
     // this.tableName,
     IndexName,
     KeyConditionExpression,
     ExpressionAttributeValues
   }
   const { Items } = await dbClient.send(new QueryCommand(queryParams))
   return Items
 };

 updateSmsRequest = async ({ correlationId, messageId, report }) => {
   const updateParams = {
     TableName: this.tableName,
     Key: { correlationId },
     UpdateExpression: 'SET report=:r, messageId=:messageId REMOVE #n, message',
     ExpressionAttributeNames: {
       '#n': 'number'
     },
     ExpressionAttributeValues: {
       ':r': report,
       ':messageId': messageId
     }
   }

   return ddbDocClient.send(new UpdateCommand(updateParams))
 };
}
export const patientInfo = new DynamoDb(PATIENT_TABLE_NAME)
