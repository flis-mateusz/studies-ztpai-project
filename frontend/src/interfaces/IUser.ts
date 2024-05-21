import {IMediaObject} from "@/interfaces/IMediaObject.ts";

export enum USER_ROLES {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_USER = "ROLE_USER",
}

export interface IUser {
    id: number
    email: string
    name: string
    surname: string
    avatar: IMediaObject
    phone: string
    roles?: string[]
}

export type IUserRegistration = Omit<IUser, 'id'>