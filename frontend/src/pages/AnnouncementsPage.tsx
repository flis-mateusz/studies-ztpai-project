import {Helmet} from "react-helmet-async"
import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react"
import {useSearchParams} from "react-router-dom"
import useGridLoaders from "@hooks/useGridLoaders.tsx"
import {FilterSelect, IFilters} from "@components/Filters/AnnouncementsFilters/FilterSelect.tsx"
import '@styles/announcements/announcements.css'
import '@styles/announcements/announcements-filters.css'
import {IAnimalFeature, IAnimalType, IAnnouncement} from "@/interfaces/App.ts";
import {AnnouncementGridElement} from "@components/Announcement/AnnouncementGridElement.tsx";
import {useAxiosPaginatedQuery} from "@hooks/useAxiosPaginatedQuery.tsx";
import {NoData} from "@components/NoData.tsx";
import {useDebounce} from "@hooks/useDebounce.tsx";
import {useAxiosQuery} from "@hooks/useAxiosQuery.tsx";
import {ContentTypeHeader} from "@/interfaces/IUtil.ts";

export const AnnouncementsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const announcementsContainer = useRef<HTMLElement | null>(null)
    const loader = useGridLoaders({ref: announcementsContainer, loaderHeight: 276, useColumnNumberAsCount: true})

    const animalTypesQuery = useAxiosQuery<IAnimalType[]>('/api/animal_types', {
        queryOptions: {
            queryKey: ['ANIMAL_TYPES']
        },
        accept: ContentTypeHeader.JSON
    })

    const animalFeaturesQuery = useAxiosQuery<IAnimalFeature[]>('/api/animal_features', {
        queryOptions: {
            queryKey: ['ANIMAL_FEATURES']
        },
        accept: ContentTypeHeader.JSON
    })

    const [filters, setFilters] = useState<IFilters>({
        search: searchParams.get('search') || '',
        free: searchParams.get('free') || null,
        favourite: searchParams.get('favourite') || null,
        types: searchParams.getAll('types') || [],
        features: searchParams.getAll('features').reduce((acc, entry) => {
            const [key, value] = entry.split('-');
            if (value === '0' || value === '1') {
                acc[key] = value
            }
            return acc
        }, {} as Record<string, "0" | "1">)
    })
    const debouncedFilters = useDebounce<IFilters>(filters, 500);

    const parsedFeaturesParams = useMemo(() => (
        Object.entries(debouncedFilters.features).map(([key, value]) => `${key}-${value}`)
    ), [debouncedFilters.features])

    const {query, pagination} = useAxiosPaginatedQuery<IAnnouncement>(
        '/api/announcements',
        6,
        {
            queryOptions: {
                queryKey: ['GET_ANNOUNCEMENTS', ...Object.values(debouncedFilters)],
                refetchOnMount: true
            },
            params: {
                ...debouncedFilters,
                features: parsedFeaturesParams
            }
        })

    useEffect(() => {
        const params = Object.entries(debouncedFilters)
            .reduce((acc: Record<string, string | string[]>, [key, value]) => {
                if (key == 'features') acc[key] = parsedFeaturesParams
                else if (value !== '' && value != null) acc[key] = value
                return acc
            }, {})

        setSearchParams(params, {replace: true})
    }, [parsedFeaturesParams, debouncedFilters, setSearchParams]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({
            ...prev,
            search: e.target.value
        }))
    }

    const handleFiltersChange = (name: string, value: unknown) => {
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }))
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
                <FilterSelect filters={filters}
                              handleChange={handleFiltersChange}
                              animalFeatures={animalFeaturesQuery.data}
                              animalTypes={animalTypesQuery.data}
                />
            </div>
            <div>
                <span className="main-button action-search">Szukaj</span>
            </div>
        </section>
        <section className="panel announcements-page">
            <div id="search">
                <label className="icon-input left right">
                    <i className="material-icons">search</i>
                    <input type="text" className="main-input search-input" placeholder="Wyszukaj" value={filters.search}
                           onChange={handleSearchChange}/>
                    {/*<i className="material-icons action-clear-search">clear</i>*/}
                </label>
            </div>
            <div className="announcements-container">
                <section className="panel-elements fit" ref={announcementsContainer}>
                    {query.isFetching ?
                        loader
                        :
                        query.data && query.data['hydra:member'].length ? query.data['hydra:member'].map((announcement, i) => (
                            <AnnouncementGridElement key={i} announcement={announcement}/>
                        )) : <NoData text={'Nie znaleziono ogłoszeń spełniających kryteria'}/>
                    }
                </section>
            </div>
            {pagination}
        </section>
    </>
}