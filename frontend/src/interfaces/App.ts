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
    id: number
    name: string
    announcements?: []
}

export interface IAnnouncementDetail {
    name: string
    locality: string
    price?: number | string
    description: string
    age?: number | string
    gender: string
    kind: string
    ageType: string
    announcementAnimalFeatures: IAnnouncementAnimalFeature[]
}

export interface IAnnouncementUpload {
    id: number
    mediaObject: IMediaObject
}

export interface IAnnouncementAnimalFeature {
    isPositive: boolean | null
    feature: IAnimalFeature
}

export interface IAnimalFeature {
    id: number
    name: string
    announcementAnimalFeatures?: []
}

export interface IAnnouncementReport {
    id: number
    givenAt: string
    isAccepted: boolean
    details: string
}

export interface IAnnouncementLike {
    id: number,
    givenAt: string
}
