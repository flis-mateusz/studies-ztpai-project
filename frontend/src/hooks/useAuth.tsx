import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react"
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
    signUp: (params: ISignUpMethodParams<ISignUpResponse>) => void
    signOut: () => void
    updateUser: (updatedUserData: Partial<IUser>) => void
}

interface ISignInMethodParams<T> extends IMutationMethodCallbacks<T>, ISignInData {
}

interface ISignUpMethodParams<T> extends IMutationMethodCallbacks<T>, ISignUpData {
}

// LOGIN
interface ISignInResponse {
    user: IUser
    token: string
}

export interface ISignInData {
    email: string
    password: string
}

// REGISTER
export interface ISignUpData extends Omit<IUser, 'roles' | 'id'> {
    plainPassword: string
}

interface ISignUpResponse extends IUser {
    registrationToken: string
}

const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [token, setToken] = useLocalStorage<string | null>("authToken", null)

    const checkIn = useAxiosQuery<IUser>('/api/check_in', {
        queryOptions: {
            queryKey: ['CHECKIN'],
            enabled: !!token && !user
        },
        token: token!
    })

    const signInMutation = useAxiosMutation<ISignInData, ISignInResponse>('/api/login', {
        method: 'POST',
        mutationOptions: {
            mutationKey: ['SIGN_IN']
        },
    })

    const signUpMutation = useAxiosMutation<ISignUpData, ISignUpResponse>('/api/users', {
        method: 'POST',
        mutationOptions: {
            mutationKey: ['SIGN_UP']
        },
    })

    // const signOutMutation = useAxiosMutation<null, null>('/api/signIn', {
    //     mutationOptions: {
    //         mutationKey: ['SIGN_OUT']
    //     },
    // })

    useEffect(() => {
        if (checkIn.data) {
            setUser(checkIn.data)
        }
    }, [checkIn.data])

    const signIn = (params: ISignInMethodParams<ISignInResponse>) => {
        signInMutation.mutate({...params}, {
            onSuccess: (data) => {
                setUser(data.user)
                setToken(data.token)
                params.onSuccess(data)
            },
            onError: params.onError
        })
    }

    const signUp = (params: ISignUpMethodParams<ISignUpResponse>) => {
        signUpMutation.mutate({...params}, {
            onSuccess: (data) => {
                setUser(data)
                setToken(data.registrationToken)
                params.onSuccess(data)
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

    const isAuthPending = useMemo(() => (
        (checkIn.isPending && checkIn.fetchStatus !== 'idle') || checkIn.isFetching || signInMutation.isPending || signUpMutation.isPending
    ), [checkIn.isPending, checkIn.fetchStatus, checkIn.isFetching, signInMutation.isPending, signUpMutation.isPending]);

    const value = {
        user,
        token,
        isAuthPending: isAuthPending,
        signIn,
        signUp,
        signOut,
        updateUser
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
