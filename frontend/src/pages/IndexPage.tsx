import '@styles/index.css'
import '@styles/panel-elements.css'
import '@styles/announcements/announcement-element.css'
import {ChangeEvent, FormEvent, useMemo, useRef, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import useGridLoaders from "@hooks/useGridLoaders.tsx"
import {useAxiosQuery} from "@hooks/useAxiosQuery.tsx"
import {IHydraCollection} from "@/interfaces/Hydra.ts";
import {IAnimalType, IAnnouncement} from "@/interfaces/App.ts";
import {AnnouncementGridElement} from "@components/Announcement/AnnouncementGridElement.tsx";
import {ContentTypeHeader} from "@/interfaces/IUtil.ts";
import {AllAnimalsMainButton, CatsMainButton, DogsMainButton} from "@components/Buttons.tsx";

export const IndexPage = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    const announcementsContainer = useRef<HTMLElement | null>(null)
    const loader = useGridLoaders({ref: announcementsContainer})

    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        navigate('/announcements?search=' + search)
    }

    const animalTypesQuery = useAxiosQuery<IAnimalType[]>('/api/animal_types', {
        queryOptions: {
            queryKey: ['ANIMAL_TYPES']
        },
        accept: ContentTypeHeader.JSON
    })

    const typeIds = useMemo(() => {
        return animalTypesQuery.data ? animalTypesQuery.data.reduce((map, type) => {
            map[type.name] = type.id;
            return map
        }, {} as Record<string, number | undefined>) : {}
    }, [animalTypesQuery.data])

    const query = useAxiosQuery<IHydraCollection<IAnnouncement>>(`/api/announcements`,
        {
            params: {
                page: 1,
                itemsPerPage: 5,
                order: {
                    createdAt: "DESC",
                }
            },
            queryOptions: {
                queryKey: ['GET_LAST_ANNOUNCEMENTS']
            }
        })

    const linkToCats = `/announcements?types=${typeIds['kot'] || ''}`
    const linkToDogs = `/announcements?types=${typeIds['pies'] || ''}`

    return <>
        <section className="welcome">
            <div>
                <span>
                    Zwierzak Szuka Domu
                </span>
                <div>
                    <div className="highlight">
                        Cieszymy się, że tu jesteś
                    </div>
                    <span>
                        Serwis poświęcony ogłoszeniom z adopcją zwierząt. Znajdziesz tutaj serię ogłoszeń od zwierząt,
                        które szukają nowych, kochających domów. Każde zwierzę ma swoją własną historię i potrzebuje
                        czułej opieki, dlatego jesteśmy pewni, że znajdziesz tutaj przyjaciela na całe życie.
                    </span>
                </div>
            </div>
            <div className="image"></div>
        </section>
        <section className="search">
            <label className="search-label">
                <i className="material-icons">search</i>
                <form autoComplete="off" onSubmit={handleSearch}>
                    <input type="text" style={{display: 'none'}}/>
                    <input type="text" name='search' className="main-input"
                           placeholder="Szukaj według gatunku, miasta, opisu"
                           onChange={
                               (e: ChangeEvent<HTMLInputElement>) => {
                                   setSearch(e.target.value)
                               }
                           }/>
                    <input type="submit" style={{display: 'none'}}/>
                </form>
            </label>
            <div className="search-predefined">
                <Link to={linkToCats} className={'main-button'}>
                    <CatsMainButton/>
                </Link>
                <Link to={linkToDogs} className={'main-button'}>
                    <DogsMainButton/>
                </Link>
                <Link to={'announcements'} className={'main-button'}>
                    <AllAnimalsMainButton/>
                </Link>
            </div>
        </section>
        <section className="announcements">
            <section>
                <span>Ostatnio dodane ogłoszenia</span>
                <section className="panel-elements cut" ref={announcementsContainer}>
                    {
                        query.isPending ?
                            loader
                            :
                            query.data ? query.data['hydra:member'].map((announcement, i) => (
                                <AnnouncementGridElement key={i} announcement={announcement}/>
                            )) : null
                    }
                </section>
            </section>
        </section>
    </>
}