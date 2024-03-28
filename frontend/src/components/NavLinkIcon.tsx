import {NavLink} from "react-router-dom";

interface IProps {
    icon: string
    to: string
    text: string
}

export const NavLinkIcon = (props: IProps) => {
    return <NavLink to={props.to} end>
        <i className='material-icons'>{props.icon}</i>
        <span>{props.text}</span>
    </NavLink>
}
