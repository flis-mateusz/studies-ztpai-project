import {Helmet} from "react-helmet-async";
import {useEffect, useRef} from "react";
import {useFetch} from "@hooks/useFetch.tsx";
import {useSearchParams} from "react-router-dom";

import '@styles/announcements/announcements.css'
import '@styles/announcements/announcements-filters.css'
import useGridLoaders from "@hooks/useGridLoaders.tsx";
import {FilterSelect} from "@components/FilterSelect.tsx";
import {useQueries, useQuery, useSuspenseQueries} from "@tanstack/react-query";

export const AnnouncementsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const announcementsContainer = useRef<HTMLElement | null>(null)
    const loader = useGridLoaders({ref: announcementsContainer, useColumnNumberAsCount: true})

    // useEffect(() => {
    //     console.log(...searchParams)
    //     announcementsFetcher('/api/wait')
    //     return announcementsFetcherAbort
    // }, [announcementsFetcherAbort, announcementsFetcher, searchParams])
    //
    // useEffect(() => {
    //     filtersFetcher('/api/wait')
    //     return filtersFetcherAbort
    // }, [filtersFetcher, filtersFetcherAbort]);

    const testQuery = async () => {
        return await fetch('https://httpbin.org/get')
    }

    // const usersQuery = useQuery({ queryKey: ['users'], queryFn: testQuery })
    // const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: testQuery })

    const [usersQuery, teamsQuery, projectsQuery] = useSuspenseQueries({
        queries: [
            { queryKey: ['users'], queryFn: testQuery },
            { queryKey: ['teams'], queryFn: testQuery },
            { queryKey: ['projects'], queryFn: testQuery },
        ]
    }
    
    return <>
        <Helmet><title>Ogłoszenia</title></Helmet>

        <section className="sidenav">
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
                    <input type="text" className="main-input search-input" placeholder="Wyszukaj"/>
                    <i className="material-icons action-clear-search">clear</i>
                </label>
            </div>
            <div className="announcements-container">
                {/*<span className="api-output">Nie znaleziono ogłoszeń</span>*/}
                <section className="panel-elements fit" ref={announcementsContainer}>
                    {1 ?
                        loader
                        :
                        <>Ogłoszenia wczytane</>
                    }
                </section>
            </div>
        </section>
    </>
}