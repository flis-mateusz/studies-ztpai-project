import {IMediaObject} from "@/interfaces/App.ts";

export const enum USER_ROLES {
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
    roles?: USER_ROLES
}

export type IUserRegistration = Omit<IUser, 'id'>