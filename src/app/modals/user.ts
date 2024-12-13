import { IRentalRecord } from "./rentalRecord"
import { IRentalRequest } from "./rentalRequest"

export interface IUser {
    id: string
    nicNumber: string,
    firstName: string,
    lastName: string,
    email: string,
    contactNo: string,
    address: string,
    hashPassword: string,
    role: Roles,
    isBlocked: boolean,
    userName: string,
    profileImage: any,
    isVerified: boolean,
    rentalRecords? : IRentalRecord[],
    rentalRequests? : IRentalRequest[],
    password : string
}

export enum Roles {
    Admin,
    Manager,
    User
}
export enum Setting {
    Credentilas ,
    Info,
    Block
}