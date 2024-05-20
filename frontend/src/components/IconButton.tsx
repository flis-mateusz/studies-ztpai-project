import {MouseEvent} from "react";

interface Props {
    iconName: string
    disabled?: boolean
    onClick?: () => void
    loading?: boolean
    className?: string
    iconClassName?: string
}

export const IconButton = (props: Props) => {
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation()

        if (!props.loading && props.onClick) {
            props.onClick()
        }
    }

    return <div className={`icon-button ${props.className ? props.className : ''}`}
                onClick={handleClick}>
        <i className={`material-icons 
            ${props.iconClassName ? props.iconClassName : ''}
            ${props.loading ? 'loop' : ''}`}
        >
            {props.loading ? 'loop' : props.iconName}</i>
    </div>
}