import {NavLink} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.tsx";

export const DropDownMenu = () => {
    const auth = useAuth()

    const handleLogout = () => {
        auth.signOut()
    }

    return <div className="menu-dropdown-content">
        <div>
            <NavLink to={'/add'}>
                <i className='material-icons'>add_circle_outline</i><span>Dodaj ogłoszenie</span>
            </NavLink>
            <NavLink to={'/profile'}>
                <i className='material-icons'>account_circle</i><span>Mój profil</span>
            </NavLink>
            <NavLink to={'/announcements'}>
                <i className='material-icons'>favorite_border</i><span>Obserwowane</span>
            </NavLink>
            <NavLink to={'/help'}>
                <i className='material-icons'>help_outline</i><span>Pomoc</span>
            </NavLink>
            <hr/>
            <a onClick={handleLogout}><i className='material-icons'>exit_to_app</i><span>Wyloguj</span></a>
        </div>
    </div>
}