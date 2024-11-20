import { IImage } from "./image";
import { IInventoryUnit } from "./inventoryUnit";

export interface IBike {
    id: string,
    brand: string,
    model: string,
    type: string,
    ratePerHour: number,
    inventoryUnits?: IInventoryUnit[],
    rentalRequests?: any[],
    images?: IImage[],
}

export enum Types {
    Cruiser = 0,
    CafeRacer = 1,
    Classic = 2,
    Tourer = 3,
    SportsTouring=4,
    Sports=5,
    Scooter=6,
    Adventure=7,
    Bicycle=8
}
