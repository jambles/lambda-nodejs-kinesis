import {KinesisRecord} from './kinesis-record';

export type IConsumerCallback = (error: {}, result: {}) => void;
export type IEventPayload = {
    Records: Array<KinesisRecord>;
}