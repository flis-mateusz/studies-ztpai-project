import {Outlet} from "react-router-dom";
import {Header} from "@components/Header/Header.tsx";
import {AuthStatus} from "@components/AuthStatus.tsx";
import '@/styles/root.css'
import {Helmet} from "react-helmet";

export const Root = () => {
    return (
        <>
            <Helmet>
                <title>Zwierzak Szuka Domu</title>
            </Helmet>
            <Header/>
            <main>
                <AuthStatus/>
                <Outlet/>
            </main>
        </>
    );
}
