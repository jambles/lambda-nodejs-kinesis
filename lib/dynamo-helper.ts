import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';

AWS.config.region = process.env.awsRegion;

export class DynamoHelper {
    private tableName: string;
    private initialised: boolean = false;
    private dynamoDb: DocumentClient;

    constructor(tableName: string) {
        this.tableName = tableName;
        this.dynamoDb = this.init();
    }

    public action(action: string, params: {}): Promise<any> {

        console.log(`Dynamo: executing [${action}] with params:`, params);

        return this.dynamoDb[action](params).promise();
    }

    private init() {
        if (this.initialised) {
            return;
        }

        console.log(`Dynamo: initialising [${this.tableName}]`);

        let documentClient = new AWS.DynamoDB.DocumentClient({
            params: {
                region: process.env.awsRegion,
                TableName: this.tableName
            }
        });

        this.initialised = true;
        return documentClient;
    }
}
