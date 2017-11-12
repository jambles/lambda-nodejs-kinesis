import * as  AWS from 'aws-sdk';

const consumerTable = `${process.env.kinesisConsumerTable}-${process.env.ENV}`;
const db = new AWS.DynamoDB.DocumentClient();

export function consume(event: IEventPayload, context: {}, callback: IConsumerCallback) {
    event.Records.forEach((record) => {

        const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        const item = {eventID: record.eventID, payload: payload};
        const params = {TableName: consumerTable, Item: item};

        db.put(params, function (err, data) {
            if (err) console.log(err);
            else console.log(data);
        });

    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
    callback(null, `Successfully processed ${event.Records.length} records.`);
}

export type IConsumerCallback = (error: {}, result: {}) => void;
export type IEventPayload = {
    Records: any;
}