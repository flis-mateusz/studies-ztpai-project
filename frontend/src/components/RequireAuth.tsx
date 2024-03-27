import {useAuth} from "@/hooks/useAuth.tsx";
import {Navigate, useLocation} from "react-router-dom";
import {ReactNode} from "react";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}