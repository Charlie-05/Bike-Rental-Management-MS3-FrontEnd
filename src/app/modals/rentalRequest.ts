import { IBike } from "./bike";

export interface IRentalRequest {
    id: string,
    requestTime: string,
    status: Status,
    bikeId: string,
    userId: string,
    notify: boolean,
    bike? : IBike
}

export enum Status {
    pending = 0,
    accepted = 1,
    declined = 2
}