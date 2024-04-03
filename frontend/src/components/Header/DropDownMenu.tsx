import {useAuth} from "@/hooks/useAuth.tsx";
import {NavLinkIcon} from "@components/NavLinkIcon.tsx";

export const DropDownMenu = ({hover, handleMenuHover}: { hover: boolean, handleMenuHover: (t: boolean) => void }) => {
    const auth = useAuth()

    const handleLogout = () => {
        auth.signOut()
    }

    return <div className={`menu-dropdown-container ${hover ? 'visible' : ''}`}
                onMouseEnter={() => handleMenuHover(true)}
                onMouseLeave={() => handleMenuHover(false)}
    >
        <div className='menu-dropdown-shadow'>
            <div className='menu-dropdown-content'>
                <div>
                    <NavLinkIcon icon={'add_circle_outline'} to={'add'} text={'Dodaj ogłoszenie'}/>
                    <NavLinkIcon icon={'account_circle'} to={'profile'} text={'Mój profil'}/>
                    <NavLinkIcon icon={'favorite_border'} to={'announcements'} text={'Obserwowane'}/>
                    <hr/>
                    <a onClick={handleLogout}><i className='material-icons'>exit_to_app</i><span>Wyloguj</span></a>
                </div>
            </div>
        </div>
    </div>
}