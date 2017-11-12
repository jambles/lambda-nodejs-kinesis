export class KinesisRecord {
    kinesis: KinesisRecordDetail;
    eventSource: string;
    eventVersion: string;
    eventID: string;
    eventName: string;
    invokeIdentityArn: string;
    awsRegion: string;
    eventSourceARN: string;
}

export class KinesisRecordDetail {
    kinesisSchemaVersion: string;
    partitionKey: string;
    sequenceNumber: string;
    data: string;
    approximateArrivalTimestamp: number;
}