import { IBike } from "./bike"

export interface IBrand{
    id : string,
    name : string
    bikes : IBike[]
}