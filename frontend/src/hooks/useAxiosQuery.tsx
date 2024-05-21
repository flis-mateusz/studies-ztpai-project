import {useQuery, UseQueryOptions} from "@tanstack/react-query"
import {IBasicAxiosRequestParams, useBasicAxiosRequest} from "@hooks/useBasicAxiosRequest.tsx";

export interface IAxiosQueryOptions<T> extends Omit<IBasicAxiosRequestParams, 'contentType'> {
    queryOptions: UseQueryOptions<T>
    params?: {
        page?: number,
        itemsPerPage?: number,
        order?: {
            [key: string]: 'ASC' | 'DESC'
        }
    } & {
        [key: string]: unknown
    }
}

export const useAxiosQuery = <T, >(
    url: string,
    options: IAxiosQueryOptions<T>
) => {
    const {query} = useBasicAxiosRequest<T>(url, {...options, method: 'GET'})

    return useQuery<T>({...options.queryOptions, queryFn: query})
}
