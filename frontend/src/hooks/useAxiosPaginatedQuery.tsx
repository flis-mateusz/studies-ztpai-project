import {IAxiosQueryOptions, useAxiosQuery} from "@hooks/useAxiosQuery.tsx";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {HydraCollection} from "@/interfaces/Hydra.ts";
import {Pagination} from "@mui/material";


export const useAxiosPaginatedQuery = <T, >(
    url: string,
    itemsPerPage: number,
    options: IAxiosQueryOptions<HydraCollection<T>>
) => {
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState<number>(0)

    const query = useAxiosQuery<HydraCollection<T>>(url, {
        ...options,
        queryOptions: {
            ...options.queryOptions,
            queryKey: [...options.queryOptions.queryKey, page],
        },
        params: {
            ...options.params,
            page: page,
            itemsPerPage: itemsPerPage
        }
    })

    useEffect(() => {
        if (query.data && query.data['hydra:totalItems'] != null) {
            setTotalItems(query.data['hydra:totalItems'])
        }
    }, [query.data])

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const pageCount = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);
    const pagination = totalItems ?
        <Pagination count={pageCount} onChange={handlePageChange}/>
        : null;

    return {query, pagination}
}
