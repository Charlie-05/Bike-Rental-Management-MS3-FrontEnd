import { IImage } from "./image";
import { IInventoryUnit } from "./inventoryUnit";

export interface IBike{
    id : string,
    brand : string,
    model : string,
    type : string ,
    ratePerHour : number,
    inventoryUnits : IInventoryUnit[],
    rentalRequests : any[],
    images : IImage[],
}