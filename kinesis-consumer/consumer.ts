import {DynamoHelper} from '../lib/dynamo-helper';
import {IConsumerCallback, IEventPayload} from '../lib/lambda-models';

const consumerTable = `${process.env.kinesisConsumerTable}-${process.env.ENV}`;
const dynamo = new DynamoHelper(consumerTable);

export async function consume(event: IEventPayload, context: {}, callback: IConsumerCallback) {
    await event.Records.forEach((record) => {
        const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        return saveItem(new KinesisRecordEntity(record.eventID, payload))
            .catch(reason => {
                console.error("persisting record failed", reason);
            });
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
}

export function saveItem(item: KinesisRecordEntity) {
    const params = {
        Item: {
            eventID: item.eventID,
            payload: item.payload
        }
    };

    return dynamo.action('put', params);
}

export class KinesisRecordEntity {
    eventID: string;
    payload: string;

    constructor(eventID: string, payload: string) {
        this.eventID = eventID;
        this.payload = payload;
    }
}