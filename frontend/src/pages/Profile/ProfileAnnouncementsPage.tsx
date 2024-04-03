import {Helmet} from "react-helmet-async";
import {useRef} from "react";
import useGridLoaders from "@hooks/useGridLoaders.tsx";

export const ProfileAnnouncementsPage = () => {
    const announcementsContainer = useRef<HTMLElement | null>(null)
    const loader = useGridLoaders({ref: announcementsContainer, useColumnNumberAsCount: true})

    return <>
        <Helmet><title>Moje ogłoszenia</title></Helmet>

        <section className="panel-elements fit" ref={announcementsContainer}>
            {loader}
        </section>
    </>
}