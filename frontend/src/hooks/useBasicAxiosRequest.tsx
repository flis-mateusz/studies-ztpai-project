import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import {useLocation, useNavigate} from "react-router-dom";
import {ContentTypeHeader} from "@/types/IUtil.ts";
import {useMemo} from "react";
import {useToken} from "@hooks/useToken.tsx";
import {DefaultSwalToast} from "@/swal2/Popups.tsx";
import {useAuth} from "@hooks/useAuth.tsx";

export interface IBasicAxiosRequestParams extends Omit<AxiosRequestConfig, 'url'> {
    accept?: ContentTypeHeader
    contentType?: ContentTypeHeader
}

interface SymfonyError {
    title?: string
    detail?: string
    message?: string
}

export const useBasicAxiosRequest = <T, TVariables = unknown>(
    url: string,
    options: IBasicAxiosRequestParams
) => {
    const [token] = useToken()
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const config = useMemo(() => ({
        ...options,
        url: url,
        headers: {
            Accept: options.accept || "application/ld+json",
            "Content-Type": options.contentType || "application/ld+json",
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    }), [url, options, token])

    const catchError = (err: AxiosError<SymfonyError>) => {
        if (err.response) {
            DefaultSwalToast.fire('Wystąpił błąd', err.response.data?.detail || err.response.data?.message, 'error')
            switch (err.response.status) {
                case 401:
                    auth?.token ? auth.signOut() : null
                    navigate('/login', {state: location.pathname != '/login' ? {from: location} : null, replace: true})
                    throw err
            }
        }
        throw err
    }

    const mutation = async (variables?: TVariables): Promise<T> =>
        axios.request<T>({...config, data: variables})
            .then(res => res.data)
            .catch(catchError);

    const query = async (): Promise<T> =>
        axios.request<T>(config)
            .then(res => res.data)
            .catch(catchError);

    return {query, mutation}
}
