import axios, {AxiosRequestConfig, Method} from 'axios'
import {useMutation, UseMutationOptions} from '@tanstack/react-query'
import {useNavigate, useLocation} from 'react-router-dom'

interface AxiosMutationOptions<T, TVariables> extends Omit<AxiosRequestConfig, 'url' | 'method'> {
    token?: string
    mutationOptions: UseMutationOptions<T, unknown, TVariables>
    method: Exclude<Method, "GET" | "get">
}

export const useAxiosMutation = <TVariables, T = unknown>(
    url: string,
    options: AxiosMutationOptions<T, TVariables>
) => {
    const navigate = useNavigate()
    const location = useLocation()

    const mutationFn = async (variables: TVariables): Promise<T> => {
        const config: AxiosRequestConfig = {
            ...options,
            url: url,
            method: options.method,
            data: variables,
            headers: {
                ...options.headers,
                Authorization: options.token ? `Bearer ${options.token}` : undefined,
                "Content-Type": 'application/ld+json'
            },
        }

        return axios.request<T>(config)
            .then((res) => res.data)
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate('/login', {state: {from: location}, replace: true})
                }
                throw err
            })
    }

    return useMutation<T, unknown, TVariables>({...options.mutationOptions, mutationFn})
}
