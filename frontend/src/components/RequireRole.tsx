import {useAuth} from "@/hooks/useAuth.tsx";
import {ReactNode} from "react";


export const RequireRole = ({children, role}: { children: ReactNode, role: string }) => {
    const auth = useAuth();

    if (auth.user && !auth.hasRole(role)) {
        return <span>Nie masz wymaganych uprawnień</span>;
    }

    return children;
}