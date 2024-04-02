import {Helmet} from "react-helmet-async";
import {useEffect} from "react";
import {useFetch} from "@hooks/useFetch.tsx";
import {useSearchParams} from "react-router-dom";

export const AnnouncementsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const {fetcher, abort, isPending} = useFetch()

    useEffect(()=> {
        console.log(...searchParams)
        fetcher('/api/checkIn')
        return abort
    }, [abort, fetcher, searchParams])

    return <>
        <Helmet><title>Ogłoszenia</title></Helmet>


    </>
}