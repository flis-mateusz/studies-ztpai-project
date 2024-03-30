import {Link, NavLink, useLocation} from "react-router-dom";
import '@styles/header.css'
import {useEffect, useRef} from "react";
import {useAuth} from "@/hooks/useAuth.tsx";
import {DropDownMenu} from "@components/Header/DropDownMenu.tsx";
import {CustomContentLoader} from "@components/Loaders.tsx";


export const Header = () => {
    const auth = useAuth()
    const {pathname} = useLocation()
    const dropDownIcon = useRef<HTMLInputElement>(null)

    useEffect(() => {
        dropDownIcon.current ? dropDownIcon.current.checked = false : null
    }, [pathname])

    return (
        <header>
            <nav>
                <div className='submenu'>
                    <div><Link to={'/'} className='logo'>ZwierzakSzukaDomu</Link></div>
                    <div>
                        <NavLink to={`announcements`}>Ogłoszenia</NavLink>
                        <NavLink to={`contact`}>Kontakt</NavLink>
                    </div>
                </div>
                <div className='menu-dropdown'>
                    <input className="menu-button" type="checkbox" id="menu-button" ref={dropDownIcon}/>
                    <label className="menu-icon" htmlFor="menu-button"><span className="navicon"></span></label>
                    {
                        auth.token ?
                            <>
                                {
                                    auth.isAuthPending ?
                                        <CustomContentLoader width={58} height={58} radius={90}/>
                                        :
                                        <div className="avatar"></div>
                                }
                                <DropDownMenu/>
                            </>
                            :
                            pathname == '/login' ?
                                <NavLink to={`/`}>Strona główna</NavLink>
                                :
                                <NavLink to={`login`}>Zaloguj się</NavLink>
                    }
                </div>
            </nav>
        </header>
    );
}

