import {MouseEvent} from "react";

interface Props {
    name: string
    value: string | boolean | null | number
    id?: string
    handleChange: (id: string) => void
}

export const FilterOption = (props: Props) => {
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        props.handleChange(props.id ? props.id : '')
    }

    const labelClassName = props.value == '1' ? 'yes' : props.value == '0' ? 'no' : ''

    return <div className={`label ${labelClassName}`}  onClick={handleClick}>
        {props.name}
    </div>
}