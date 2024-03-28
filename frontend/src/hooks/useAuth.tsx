import {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {useLocalStorage} from "@/hooks/useLocalStorage.tsx"
import {User} from "@typeDefs/User.ts"
import {FetchResponse, useFetch} from "@/hooks/useFetch.tsx"
import {useLocation, useNavigate} from "react-router-dom"
import axios from 'axios'

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthPending: boolean
    signIn: (email: string, password: string) => Promise<FetchResponse<SignInResponse>>
    signOut: () => Promise<void>
}

interface SignInResponse {
    user: User
    token: string
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const {fetcher, isPending: isAuthPending} = useFetch<SignInResponse>()

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useLocalStorage<string | null>("authToken", null);

    useEffect(() => {
        if (!user && token) {
            fetcher('/api/checkIn', {}, token)
                .then((response) => {
                    setUser({email: 'ddd@ddd'})
                })
                .catch((error) => {
                    console.log(error)
                    setToken(null)
                    navigate('/login', {state: {from: location, error: error}})
                })
        }
    }, [token, fetcher, user, setToken, navigate, location]);

    const signIn = (user: string, password: string) => {
        return fetcher('/api/signIn', {method: 'POST', body: JSON.stringify({user, password})})
            .then((response) => {
                    // if (response.data) {
                    //     setToken(response.data.token)
                    // }
                    setToken('998998')
                    setUser({email: 'pwp@wp.pl'})
                    return response
                }
            )
    }

    const signOut = () => {
        return fetcher('/api/signOut', {}, token)
            .then(() => {
                    setToken(null)
                    setUser(null)
                }
            )
    };

    const value = {user, token, isAuthPending, signIn, signOut};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};