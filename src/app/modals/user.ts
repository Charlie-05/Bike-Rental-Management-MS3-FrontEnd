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
    hashPassword: string
    role: Roles
    isBlocked: boolean
    userName: boolean
    profileImage: string,
    isVerified: boolean,
    rentalRecords? : IRentalRecord[],
    rentalRequests? : IRentalRequest[]
}

export enum Roles {
    Admin,
    Manager,
    User
}