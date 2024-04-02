import {Outlet} from "react-router-dom";
import {Header} from "@components/Header/Header.tsx";
import {Helmet} from "react-helmet-async";

import '@styles/root.css'

export const Layout = () => {
    return (
        <>
            <Helmet><title>Zwierzak Szuka Domu</title></Helmet>

            <Header/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}
