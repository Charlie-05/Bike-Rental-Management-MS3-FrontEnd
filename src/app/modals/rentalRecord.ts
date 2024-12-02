import { IRentalRequest } from "./rentalRequest"

export interface IRentalRecord {
    id : string,
    rentalOut : string,
    rentalReturn : string,
    payment : number
    bikeRegNo : string,
    rentalRequestId : string,
    rentalRequest : IRentalRequest
}