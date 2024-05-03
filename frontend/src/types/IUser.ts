export interface IUser {
    id:number
    email: string
    name: string
    surname: string
    avatarUrl?: string
    phone: string
    roles?: string[]
}

export type IUserRegistration = Omit<IUser, 'id'>