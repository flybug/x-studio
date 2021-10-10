export interface Event {
    event: EventKey,
    sender: string,
}

export enum EventKey {
    TEST = 'event.test'
}
