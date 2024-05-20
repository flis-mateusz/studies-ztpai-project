import {IUser} from "@/interfaces/IUser.ts"
import {IMediaObject} from "@/interfaces/IMediaObject.ts";

export interface IAnnouncement {
    id: number
    isAccepted: boolean
    createdAt: string
    animalType: IAnimalType
    user: IUser
    announcementDetail: IAnnouncementDetail
    uploads: IAnnouncementUpload[]
    announcementReports?: IAnnouncementReport[]
}

export interface IAnimalType {
    name: string
}

export interface IAnnouncementDetail {
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
    id: number
    mediaObject: IMediaObject
}

export interface IAnnouncementAnimalFeature {
    isPositive: boolean
    feature: IAnimalFeature
}

export interface IAnimalFeature {
    name: string
}

export interface IAnnouncementReport {
    id: number
    givenAt: string
    isAccepted: boolean
    details: string
}

export interface IAnnouncementLike {
    "id": 0,
    "givenAt": "2024-05-20T18:41:46.536Z"
}
