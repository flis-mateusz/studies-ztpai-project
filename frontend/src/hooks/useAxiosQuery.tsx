import axios, {AxiosRequestConfig} from 'axios'
import {useQuery, UseQueryOptions} from "@tanstack/react-query"
import {useLocation, useNavigate} from "react-router-dom";

interface AxiosQueryOptions<T> extends Omit<AxiosRequestConfig, 'url' | 'method'> {
    token?: string
    queryOptions: UseQueryOptions<T>
    params?: {
        page?: number,
        itemsPerPage?:number,
        order?: {
            [key: string]: 'ASC' | 'DESC'
        }
    } & {
        [key: string]: any
    }
}

export const useAxiosQuery = <T, >(
    url: string,
    options: AxiosQueryOptions<T>
) => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryFn = async (): Promise<T> => {

        const config: AxiosRequestConfig = {
            ...options,
            headers: {
                ...options.headers,
                Authorization: options.token ? `Bearer ${options.token}` : undefined,
            },
        }

        return axios.get<T>(url, config)
            .then((res) => res.data)
            .catch((err) => {
                if (err.response.status === 401) {
                    navigate('/login', {state: {from: location}, replace: true})
                }
                throw err
            })
    };

    return useQuery<T>({...options.queryOptions, queryFn: queryFn})
}
