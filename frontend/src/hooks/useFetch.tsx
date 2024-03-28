import {useCallback, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

export const useFetch = <T, >() => {
    const navigate = useNavigate()
    const location = useLocation();
    const [isPending, setIsPending] = useState(false)

    const fetcher = useCallback(async (
        url: string,
        options: RequestInit = {},
        token?: string | null
    ): Promise<IFetchResponse<T>> => {

        const headers = new Headers(options.headers || {})
        if (token) {
            headers.append('Authorization', `Bearer ${token}`)
        }
        headers.append('Content-Type', 'application/json')

        try {
            setIsPending(true)
            const response = await fetch(url, { ...options, headers })

            if (!response.ok) {
                if (response.status === 401) {
                    navigate('/login', { state: { from: location }, replace: true })
                }
                return await response.json()
            }

            return await response.json()
        } catch (error) {
            throw { success: false, message: error }
        } finally {
            setIsPending(false)
        }
    }, [location, navigate])

    return {fetcher, isPending}
}

export interface IFetchResponse<T> {
    success: boolean
    data?: T
    message?: string
}