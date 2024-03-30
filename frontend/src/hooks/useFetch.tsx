import {useCallback, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

export const useFetch = <T, >() => {
    const navigate = useNavigate()
    const location = useLocation();
    const [activeRequests, setActiveRequests] = useState<number>(0)
    const abortControllerRef = useRef<AbortController | null>(null)

    const fetcher = useCallback(async (
        url: string,
        options: RequestInit = {},
        token?: string | null
    ): Promise<IFetchResponse<T>> => {
        setActiveRequests((prev) => prev + 1)

        abortControllerRef.current = new AbortController()
        const {signal} = abortControllerRef.current

        const headers = new Headers(options.headers || {})
        if (token) {
            headers.append('Authorization', `Bearer ${token}`)
        }
        headers.append('Content-Type', 'application/json')

        try {
            const response = await fetch(url, {...options, headers, signal})

            if (!response.ok) {
                if (response.status === 401) {
                    navigate('/login', {state: {from: location}, replace: true})
                }
                return await response.json()
            }
            return await response.json()
        } catch (error) {
            if (signal.aborted) {
                throw {success: false, aborted: true}
            }
            throw {success: false, message: error}
        } finally {
            setActiveRequests((prev) => prev - 1)
        }
    }, [location, navigate])

    const abort = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            abortControllerRef.current = null
        }
    }, []);

    const isPending = activeRequests > 0

    return {fetcher, isPending, abort}
}

export interface IFetchResponse<T> {
    success: boolean
    data?: T
    message?: string
    aborted?: boolean
}