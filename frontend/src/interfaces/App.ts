import {IUser} from "@/types/IUser.ts"
import {IMediaObject} from "@/interfaces/IMediaObject.ts";

export interface IAnnouncement {
    '@id': string
    '@type': string
    id: number
    isAccepted: boolean
    createdAt: string
    animalType: IAnimalType
    user: IUser
    announcementDetail: IAnnouncementDetail
    uploads: IAnnouncementUpload[]
}

export interface IAnimalType {
    '@id': string
    '@type': string
    name: string
}

export interface IAnnouncementDetail {
    '@id': string
    '@type': string
    name: string
    locality: string
    price: number
    description: string
    age: number
    gender: string
    avatarUrl: string
    kind: string
    ageType: string
    announcementAnimalFeatures: IAnnouncementAnimalFeature[]
}

export interface IAnnouncementUpload {
    '@id': string
    '@type': string
    id: number
    mediaObject: IMediaObject
}

export interface IAnnouncementAnimalFeature {
    '@type': string
    '@id': string
    isPositive: boolean
    feature: IAnimalFeature
}

export interface IAnimalFeature {
    '@type': string
    '@id': string
    name: string
}