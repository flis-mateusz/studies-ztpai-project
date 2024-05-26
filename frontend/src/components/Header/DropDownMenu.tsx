import {useAuth} from "@/hooks/useAuth.tsx";
import {NavLinkIcon} from "@components/NavLinkIcon.tsx";
import {useLocation} from "react-router-dom";

export const DropDownMenu = ({hover, handleMenuHover}: { hover: boolean, handleMenuHover: (t: boolean) => void }) => {
    const auth = useAuth()
    const {pathname} = useLocation()

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
                    {
                        pathname !== '/announcements' ?
                            <NavLinkIcon icon={'favorite_border'}
                                         to={'announcements?favourite=1'}
                                         text={'Obserwowane'}/>
                            : null
                    }
                    <hr/>
                    <a onClick={handleLogout}><i className='material-icons'>exit_to_app</i><span>Wyloguj</span></a>
                </div>
            </div>
        </div>
    </div>
}