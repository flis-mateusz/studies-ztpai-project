import {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {useLocalStorage} from "@/hooks/useLocalStorage.tsx"
import {IUser} from "@/types/IUser.ts"
import {useAxiosQuery} from "@hooks/useAxiosQuery.tsx"
import {useAxiosMutation} from "@hooks/useAxiosMutation.tsx"
import {IMutationMethodCallbacks} from "@/types/IMutation.tsx"

interface IAuthContextType {
    user: IUser | null
    token: string | null
    isAuthPending: boolean
    signIn: (params: ISignInMethodParams<ISignInResponse>) => void
    signOut: () => void
    updateUser: (updatedUserData: Partial<IUser>) => void
}

interface ISignInMethodParams<T> extends IMutationMethodCallbacks<T>, ISignInData {
}

interface ISignInResponse {
    user: IUser
    token: string
}

interface ISignInData {
    email: string
    password: string
}

const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [token, setToken] = useLocalStorage<string | null>("authToken", null)

    const checkIn = useAxiosQuery<Omit<ISignInResponse, 'token'>>('/api/wait', {
        queryOptions: {
            queryKey: ['CHECKIN'],
            enabled: !!token && !user
        },
        token: token!
    })

    const signInMutation = useAxiosMutation<ISignInData, ISignInResponse>('/api/signIn', {
        method: 'POST',
        mutationOptions: {
            mutationKey: ['SIGN_IN']
        },
    })

    // const signOutMutation = useAxiosMutation<null, null>('/api/signIn', {
    //     mutationOptions: {
    //         mutationKey: ['SIGN_OUT']
    //     },
    // })

    useEffect(() => {
        if (checkIn.data) {
            setUser(checkIn.data.user)
        }
    }, [checkIn.data])

    const signIn = (params: ISignInMethodParams<ISignInResponse>) => {
        signInMutation.mutate({email: params.email, password: params.password}, {
            onSuccess: (data) => {
                setToken('TEST')
                setUser({email: 'test'})
                params.onSuccess(data)
                // TODO Change this
            },
            onError: params.onError
        })
    }

    const signOut = () => {
        setUser(null)
        setToken(null)
    }

    const updateUser = (updatedUserData: Partial<IUser>) => {
        setUser(currentUserData => ({...currentUserData, ...updatedUserData} as IUser))
    }

    const isAuthPending = (checkIn.isPending && checkIn.fetchStatus !== 'idle') || signInMutation.isPending

    const value = {
        user,
        token,
        isAuthPending: isAuthPending,
        signIn,
        signOut,
        updateUser
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
