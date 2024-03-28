import {Helmet} from "react-helmet-async";
import {Outlet} from "react-router-dom";

export const ProfilePage = () => {
    return <>
        <Helmet>
            <title>Mój profil</title>
        </Helmet>
        <Outlet/>
    </>
}