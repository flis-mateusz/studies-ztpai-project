import axios, {AxiosRequestConfig} from 'axios'
import {useQuery, UseQueryOptions} from "@tanstack/react-query"
import {useLocation, useNavigate} from "react-router-dom";
import {ContentTypeHeader} from "@/types/IUtil.ts";
import {useAuth} from "@hooks/useAuth.tsx";

interface AxiosQueryOptions<T> extends Omit<AxiosRequestConfig, 'url' | 'method'> {
    queryOptions: UseQueryOptions<T>
    accept?: ContentTypeHeader
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
    options: AxiosQueryOptions<T>
) => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const queryFn = async (): Promise<T> => {

        const config: AxiosRequestConfig = {
            ...options,
            headers: {
                Accept: options.accept ? options.accept : ContentTypeHeader.JSON_LD,
                ...options.headers,
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
