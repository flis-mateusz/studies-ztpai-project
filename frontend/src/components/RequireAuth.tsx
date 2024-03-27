import {useAuth} from "@/hooks/useAuth.tsx";
import {Navigate, useLocation} from "react-router-dom";

export const RequireAuth = ({ children }: { children: Element }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}