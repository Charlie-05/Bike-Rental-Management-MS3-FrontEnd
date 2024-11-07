import { IImage } from "./image";

export interface IBike{
    id : string,
    brand : string,
    model : string,
    type : string ,
    ratePerHour : number,
    inventoryUnits : any[],
    rentalRequests : any[],
    images : IImage[],
}