import {useAuth} from "@/hooks/useAuth.tsx";

export const AuthStatus = () => {
    const auth = useAuth()

    return (
        <>
            <div>{auth.isAuthPending ? 'pending' : ''}</div>
            <div>email: {auth.user?.email}</div>
        </>
    )
}