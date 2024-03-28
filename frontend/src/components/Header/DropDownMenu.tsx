import {useAuth} from "@/hooks/useAuth.tsx";
import {NavLinkIcon} from "@components/NavLinkIcon.tsx";

export const DropDownMenu = () => {
    const auth = useAuth()

    const handleLogout = () => {
        auth.signOut()
    }

    return <div className="menu-dropdown-content">
        <div>
            <NavLinkIcon icon={'add_circle_outline'} to={'add'} text={'Dodaj ogłoszenie'}/>
            <NavLinkIcon icon={'account_circle'} to={'profile'} text={'Mój profil'}/>
            <NavLinkIcon icon={'favorite_border'} to={'announcements'} text={'Obserwowane'}/>
            <NavLinkIcon icon={'help_outline'} to={'help'} text={'Pomoc'}/>
            <hr/>
            <a onClick={handleLogout}><i className='material-icons'>exit_to_app</i><span>Wyloguj</span></a>
        </div>
    </div>
}