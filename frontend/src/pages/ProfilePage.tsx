import {Helmet} from "react-helmet-async";
import {useEffect, useRef} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useAuth} from "@hooks/useAuth.tsx";
import {NavLinkIcon} from "@components/NavLinkIcon.tsx";

import '@styles/panel-sidenav.css'

export const ProfilePage = () => {
    const sideNavExpander = useRef<HTMLInputElement>(null)

    const auth = useAuth()
    const {pathname} = useLocation()

    useEffect(() => {
        sideNavExpander.current ? sideNavExpander.current.checked = false : null
    }, [pathname])

    return <>
        <Helmet><title>Mój profil</title></Helmet>

        <section className="sidenav">
            <div className="nav-expander">
                <input className="menu-button" type="checkbox" id="sidenav-button" ref={sideNavExpander}/>
                <label className="menu-icon" htmlFor="sidenav-button">
                    <i className="material-icons">keyboard_arrow_right</i>
                </label>
            </div>
            <div>
                <NavLinkIcon icon={'folder_open'} to={'announcements'} text={'Moje ogłoszenia'}/>
                <NavLinkIcon icon={'mode_edit'} to={''} text={'Edycja profilu'}/>

                <span>Panel administratora</span>
                <NavLinkIcon icon={'streetview'} to={'admin/approval'} text={'Ogłoszenia do akceptacji'}/>
                <NavLinkIcon icon={'verified_user'} to={'admin/reports'} text={'Zgłoszenia'}/>
                <NavLinkIcon icon={'supervisor_account'} to={'admin/users'} text={'Użytkownicy'}/>
                <NavLinkIcon icon={'toc'} to={'admin/petTypes'} text={'Typy zwierząt'}/>
                <NavLinkIcon icon={'toc'} to={'admin/petFeatures'} text={'Cechy zwierząt'}/>
            </div>
            <div>
                <a className="main-button" onClick={auth.signOut}>
                    <i className="material-icons">exit_to_app</i>
                    <span>Wyloguj</span>
                </a>
            </div>
        </section>
        <section className="panel">
            <Outlet/>
        </section>
    </>
}