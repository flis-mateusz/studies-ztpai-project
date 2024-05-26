import {Helmet} from "react-helmet-async"
import {useRef} from "react"
import {useSearchParams} from "react-router-dom"
import useGridLoaders from "@hooks/useGridLoaders.tsx"
import {FilterSelect} from "@components/FilterSelect.tsx"
import '@styles/announcements/announcements.css'
import '@styles/announcements/announcements-filters.css'
import {IAnnouncement} from "@/interfaces/App.ts";
import {AnnouncementGridElement} from "@components/Announcement/AnnouncementGridElement.tsx";
import {useAxiosPaginatedQuery} from "@hooks/useAxiosPaginatedQuery.tsx";
import {NoData} from "@components/NoData.tsx";


export const AnnouncementsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const announcementsContainer = useRef<HTMLElement | null>(null)
    const loader = useGridLoaders({ref: announcementsContainer, useColumnNumberAsCount: true})

    const {query, pagination} = useAxiosPaginatedQuery<IAnnouncement>(
        '/api/announcements',
        6,
        {
            queryOptions: {
                queryKey: ['GET_ANNOUNCEMENTS', searchParams.get('search')],
            },
            params: {
                'search': searchParams.get('search'),
            }
        })

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({'search': e.target.value})
    }

    return <>
        <Helmet><title>Ogłoszenia</title></Helmet>

        <section className="sidenav min">
            <div className="nav-expander">
                <input className="menu-button" type="checkbox" id="sidenav-button"/>
                <label className="menu-icon" htmlFor="sidenav-button">
                    <i className="material-icons">keyboard_arrow_right</i>
                </label>
            </div>
            <div>
                <FilterSelect/>
            </div>
            <div>
                <span className="main-button action-search">Szukaj</span>
            </div>
        </section>
        <section className="panel announcements-page">
            <div id="search">
                <label className="icon-input left right">
                    <i className="material-icons">search</i>
                    <input type="text" className="main-input search-input" placeholder="Wyszukaj"
                           onChange={handleSearchChange}/>
                    <i className="material-icons action-clear-search">clear</i>
                </label>
            </div>
            <div className="announcements-container">
                {/*<span className="api-output">Nie znaleziono ogłoszeń</span>*/}
                <section className="panel-elements fit" ref={announcementsContainer}>
                    {query.isFetching ?
                        loader
                        :
                        query.data && query.data['hydra:member'].length ? query.data['hydra:member'].map((announcement, i) => (
                            <AnnouncementGridElement key={i} announcement={announcement}/>
                        )) : <NoData/>
                    }
                </section>
            </div>
            {pagination}
        </section>
    </>
}