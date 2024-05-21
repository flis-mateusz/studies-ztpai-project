import {Helmet} from "react-helmet-async";
import {useRef} from "react";
import useGridLoaders from "@hooks/useGridLoaders.tsx";
import {IAnnouncement} from "@/interfaces/App.ts";
import {AnnouncementGridElement} from "@components/Announcement/AnnouncementGridElement.tsx";
import {useAxiosPaginatedQuery} from "@hooks/useAxiosPaginatedQuery.tsx";

export const AdminReportsPage = () => {
    const announcementsContainer = useRef<HTMLElement | null>(null)
    const loader = useGridLoaders({ref: announcementsContainer, useColumnNumberAsCount: true})

    const {query, pagination} = useAxiosPaginatedQuery<IAnnouncement>(
        `/api/admin/announcements/reports/unaccepted`,
        6,
        {
            queryOptions: {
                queryKey: ['ADMIN_GET_REPORTED_ANNOUNCEMENTS'],
                refetchOnMount: true
            }
        })

    return <>
        <Helmet><title>Zgłoszenia</title></Helmet>

        <section className="panel-elements fit" ref={announcementsContainer}>
            {
                query.isPending || query.isFetching ?
                    loader
                    :
                    query.data ? query.data['hydra:member'].map((announcement, i) => (
                        <AnnouncementGridElement key={i} announcement={announcement}/>
                    )) : null
            }
        </section>
        {pagination}
    </>
}