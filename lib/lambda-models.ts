export type IConsumerCallback = (error: {}, result: {}) => void;
export type IEventPayload = {
    Records: any;
}