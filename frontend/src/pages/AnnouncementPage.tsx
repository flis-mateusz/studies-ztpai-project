import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";

import '@styles/announcements/announcement.css'
import "react-image-gallery/styles/css/image-gallery.css";
import {IAnnouncement, IAnnouncementLike, IAnnouncementReport} from "@/interfaces/App.ts";
import {useAxiosQuery} from "@hooks/useAxiosQuery.tsx";
import {AxiosError} from "axios";
import {absoluteServerPath, formatDateTime, formatGenderType, formatPrice, formatTimeUnits} from "@/utils/utils.ts";
import {AvatarWithLoader} from "@components/AvatarWithLoader.tsx";
import {AnimatedLoader} from "@components/AnimatedLoader.tsx";
import ImageGallery from "react-image-gallery";
import {useState} from "react";
import {useAuth} from "@hooks/useAuth.tsx";
import {useAxiosMutation} from "@hooks/useAxiosMutation.tsx";
import {USER_ROLES} from "@/interfaces/IUser.ts";
import {INoPOSTData} from "@/interfaces/IMutation.tsx";
import {IconButton} from "@components/IconButton.tsx";

interface IAnnouncementWithUserContext extends IAnnouncement {
    userLike?: IAnnouncementLike
    userReport?: IAnnouncementReport
}

export const AnnouncementPage = () => {
    const {announcementId} = useParams()
    const [fullScreen, setFullScreen] = useState<boolean>(false)
    const auth = useAuth()
    const navigate = useNavigate()

    const API_URL = `/api/${auth.hasRole(USER_ROLES.ROLE_ADMIN) ? 'admin/' : ''}announcements/${announcementId}`

    const query = useAxiosQuery<IAnnouncementWithUserContext>(API_URL, {
        queryOptions: {
            queryKey: ['ANNOUNCEMENT', announcementId, auth.user?.roles || []],
            refetchOnMount: true
        }
    })
    const announcement = query.data

    const deleteMutation = useAxiosMutation<null, null>(`/api/announcements/${announcementId}`, {
        method: "DELETE",
        mutationOptions: {
            mutationKey: ['ANNOUNCEMENT_DELETE', announcementId],
        }
    })

    const likeMutation = useAxiosMutation<INoPOSTData, IAnnouncementLike>(`/api/announcements/${announcementId}/likes`, {
        method: "POST",
        mutationOptions: {
            mutationKey: ['ANNOUNCEMENT_LIKE', announcementId],
        },
    })

    const deleteLikeMutation = useAxiosMutation<null, null>(`/api/announcement_likes/${announcement?.userLike?.id}`, {
        method: "DELETE",
        mutationOptions: {
            mutationKey: ['ANNOUNCEMENT_LIKE_DELETE', announcementId],
        },
    })

    const reportMutation = useAxiosMutation<INoPOSTData, IAnnouncementReport>(`/api/announcements/${announcementId}/reports`, {
        method: "POST",
        mutationOptions: {
            mutationKey: ['ANNOUNCEMENT_REPORT', announcementId],
        },
    })

    const adminAcceptMutation = useAxiosMutation<INoPOSTData, IAnnouncement>(`${API_URL}/accept`, {
        method: "POST",
        mutationOptions: {
            mutationKey: ['ANNOUNCEMENT_ADMIN_ACCEPT', announcementId],
        }
    })

    const adminDeleteMutation = useAxiosMutation<null, null>(API_URL, {
        method: "DELETE",
        mutationOptions: {
            mutationKey: ['ANNOUNCEMENT_DELETE', announcementId],
        }
    })

    if (query.error instanceof AxiosError && query.error.response?.status === 404) {
        return <>
            <div>Ogłoszenie nie istnieje lub zostało usunięte</div>
        </>
    }

    if (!announcement) {
        return <AnimatedLoader visible={query.isPending || auth.isAuthPending}/>
    }

    const isOwner = announcement.user.id === auth.user?.id

    const images = announcement.uploads.map((upload) => {
        const url = absoluteServerPath(upload.mediaObject.contentUrl)
        return {
            original: url,
            thumbnail: url,
        }
    })

    const invalidate = async () => {
        await query.refetch()
    }

    const handleLike = () => {
        announcement.userLike ?
            deleteLikeMutation.mutate(null, {
                onSettled: invalidate
            })
            :
            likeMutation.mutate({}, {
                onSettled: invalidate
            })
    }

    const handleReport = () => {
        if (!announcement.userReport) {
            reportMutation.mutate({}, {
                onSettled: invalidate
            })
        }
    }

    const handleAccept = () => {
        adminAcceptMutation.mutate({}, {
            onSettled: invalidate
        })
    }

    const handleDelete = () => {
        deleteMutation.mutate(null, {
            onSuccess: () => {
                navigate(-1)
            }
        })
    }

    const handleAdminDelete = () => {
        adminDeleteMutation.mutate(null, {
            onSuccess: () => {
                navigate(-1)
            }
        })
    }

    const handleEdit = () => {
        navigate(`/announcement/${announcementId}/edit`)
    }

    const renderOwnerActions = () => (
        <>
            <IconButton iconName={'edit'} onClick={handleEdit}/>
            <IconButton iconName={'delete_forever'}
                        onClick={handleDelete}
                        loading={deleteMutation.isPending || query.isFetching}/>
        </>
    );

    const renderAdminActions = () => (
        <>
            {
                announcement.announcementReports?.length ?
                    <IconButton iconName='gravel'
                                className={'admin'}
                                loading={true}
                    /> : null
            }
            <IconButton iconName='delete_forever'
                        className={'admin'}
                        loading={adminDeleteMutation.isPending || query.isFetching} onClick={handleAdminDelete}/>
        </>
    )

    return <>
        <Helmet><title>{announcement.announcementDetail.name}</title></Helmet>

        <section className="announcement-header">
            <div>
                <span>{announcement.announcementDetail.name}</span>
                <span>dodano {formatDateTime(announcement.createdAt)}</span>
            </div>
            {
                !isOwner && !auth.hasRole(USER_ROLES.ROLE_ADMIN) ?
                    <div className={`announcement-report ${!announcement.userReport ? 'action-report' : null}`}
                         onClick={handleReport}>
                        <i className="material-icons">flag</i>
                        {
                            announcement.userReport ?
                                <span>Zgłoszono {formatDateTime(announcement.userReport.givenAt)}</span>
                                :
                                <span>Zgłoś ogłoszenie</span>
                        }
                    </div>
                    : null
            }
            {
                isOwner || auth.hasRole(USER_ROLES.ROLE_ADMIN) ?
                    <div>
                        {
                            !announcement.isAccepted ?
                                <IconButton iconName='assignment_turned_in'
                                            onClick={handleAccept}
                                            className='admin action-approve'
                                            loading={adminAcceptMutation.isPending || query.isFetching}/>
                                :
                                null
                        }
                        {isOwner ? renderOwnerActions() : renderAdminActions()}
                    </div>
                    : null
            }
        </section>
        <section className="announcement-view">
            <div className="about-pet">
                {
                    !isOwner ?
                        <IconButton iconName={''}
                                    className={'like'}
                                    iconClassName={`action-like ${announcement.userLike ? 'liked' : null}`}
                                    loading={likeMutation.isPending || deleteLikeMutation.isPending || query.isFetching}
                                    onClick={handleLike}
                        />
                        : null
                }

                <ImageGallery items={images}
                              showPlayButton={false}
                              showBullets={images.length > 1}
                              showThumbnails={images.length > 1}
                              onScreenChange={(p) => {
                                  setFullScreen(p)
                              }}
                              additionalClass={!fullScreen ? 'cover' : ''}
                />
                <div className="info">
                    <div>
                        <div>
                            <span>Typ</span>
                            <span className="capitalize">{announcement.animalType.name}</span>
                        </div>
                        <div>
                            <span>Gatunek</span>
                            <span className="capitalize">{announcement.announcementDetail.kind}</span>
                        </div>
                        <div>
                            <span>Płeć</span>
                            <span>{formatGenderType(announcement.announcementDetail.gender)}</span>
                        </div>
                        <div>
                            <span>Wiek</span>
                            <span>{formatTimeUnits(announcement.announcementDetail.age, announcement.announcementDetail.ageType)}</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="badges">
                        Cechy zwierzaka
                    </div>
                    <hr className="resp-only"/>
                </div>
                <div className="description">
                    {announcement.announcementDetail.description}
                </div>
            </div>
            <div className="about-user">
                <div className="user-basic">
                    <AvatarWithLoader isLoading={query.isPending} mediaObject={announcement.user.avatar} responsive/>
                    <div>
                        <div className="name">{announcement.user.name} {announcement.user.surname}</div>
                        <div>
                            <i className="material-icons">location_on</i>
                            <span>{announcement.announcementDetail.locality}</span>
                        </div>
                    </div>
                </div>
                <div className="inline">
                    <span>Cena</span>
                    <span>{formatPrice(announcement.announcementDetail.price)}</span>
                </div>
                <div className="inline">
                    <span>Numer telefonu</span>
                    <span>{announcement.user.phone}</span>
                </div>
            </div>
        </section>
    </>
}