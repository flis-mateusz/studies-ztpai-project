import {Link, NavLink, useLocation} from "react-router-dom";
import '@styles/header.css'
import {useEffect, useRef, useState} from "react";
import {useAuth} from "@/hooks/useAuth.tsx";
import {DropDownMenu} from "@components/Header/DropDownMenu.tsx";
import {AvatarWithLoader} from "@components/AvatarWithLoader.tsx";


export const Header = () => {
    const auth = useAuth()
    const {pathname} = useLocation()
    const dropDownIcon = useRef<HTMLInputElement>(null)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        dropDownIcon.current ? dropDownIcon.current.checked = false : null
        setHover(false)
    }, [pathname])

    const handleMenuHover = (t: boolean) => {
        setHover(t)
    }

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
                <div className={`menu-dropdown ${auth.token && 'logged-user'}`}>
                    <input className="menu-button" type="checkbox" id="menu-button" ref={dropDownIcon}/>
                    <label className="menu-icon" htmlFor="menu-button"><span className="navicon"></span></label>
                    {
                        auth.token ?
                            <>
                                <AvatarWithLoader isLoading={auth.isAuthPending} width={58} height={58}
                                                  url={auth.user?.avatar}
                                                  onMouseEnter={() => setHover(true)}
                                                  onMouseLeave={() => setHover(false)}
                                />
                                <DropDownMenu hover={hover} handleMenuHover={handleMenuHover}/>
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

