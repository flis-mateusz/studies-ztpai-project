import {Outlet} from "react-router-dom";
import {Header} from "../components/Header.tsx";
import '@/styles/root.css'
import {AuthStatus} from "@components/AuthStatus.tsx";

export const Root = () => {
    return (
        <>
            <Header/>
            <main>
                <AuthStatus/>
                <Outlet/>
            </main>
        </>
    );
}
