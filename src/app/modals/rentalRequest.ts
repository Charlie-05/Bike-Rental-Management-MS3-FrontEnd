export interface IRentalRequest {
    id: string,
    requestTime: string,
    status: Status,
    bikeId: string,
    nicNumber: string,
    notify: boolean
}

export enum Status {
    pending = 0,
    accepted = 1,
    declined = 2
}