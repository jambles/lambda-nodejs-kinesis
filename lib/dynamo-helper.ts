import * as AWS from 'aws-sdk';

AWS.config.region = process.env.awsRegion;

export class DynamoHelper {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public action(action: string, params: {}) : Promise<any>{
    const dynamoDb = this.init();

    console.log(`Dynamo: executing [${action}] with params:`);
    console.log(params);

    return dynamoDb[action](params).promise();
  }

  private init() {
    console.log(`Dynamo: initialising [${this.tableName}]`);

    return new AWS.DynamoDB.DocumentClient({
      params: {
        region: process.env.awsRegion,
        TableName: this.tableName
      }
    });
  }
}
