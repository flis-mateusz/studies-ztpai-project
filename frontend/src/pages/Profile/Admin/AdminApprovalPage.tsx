import {Helmet} from "react-helmet-async";
import {IAnnouncement} from "@/interfaces/App.ts";
import useGridLoaders from "@hooks/useGridLoaders.tsx";
import {useRef} from "react";
import {AnnouncementGridElement} from "@components/Announcement/AnnouncementGridElement.tsx";
import {useAxiosPaginatedQuery} from "@hooks/useAxiosPaginatedQuery.tsx";
import {NoData} from "@components/NoData.tsx";

export const AdminApprovalPage = () => {
    const announcementsContainer = useRef<HTMLElement | null>(null)
    const loader = useGridLoaders({ref: announcementsContainer, useColumnNumberAsCount: true})

    const {query, pagination} = useAxiosPaginatedQuery<IAnnouncement>(
        `/api/admin/announcements/unaccepted`,
        6,
        {
            queryOptions: {
                queryKey: ['ADMIN_GET_UNACCEPTED_ANNOUNCEMENTS'],
                refetchOnMount: true
            }
        })

    return <>
        <Helmet><title>Ogłoszenia do akceptacji</title></Helmet>

        <section className="panel-elements fit" ref={announcementsContainer}>
            {
                query.isPending || query.isFetching ?
                    loader
                    :
                    query.data && query.data['hydra:member'].length ? query.data['hydra:member'].map((announcement, i) => (
                        <AnnouncementGridElement key={i} announcement={announcement}/>
                    )) : <NoData/>
            }
        </section>
        {pagination}
    </>
}