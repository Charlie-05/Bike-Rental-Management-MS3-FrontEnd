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
    isVerified: boolean
}

export enum Roles {
    Admin,
    Manager,
    User
}