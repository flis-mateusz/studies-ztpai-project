import {ChangeEvent} from "react";
import {CustomContentLoader} from "@components/Loaders.tsx";

interface Props {
    isLoading: boolean
    value: string
    name: string
    type: string
    label: string
    loaderWidth: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputWithLoader = (props: Props) => {
    return <div>
        <label htmlFor={props.name}><span>{props.label}</span></label>
        {props.isLoading ?
            <CustomContentLoader width={props.loaderWidth} height={53} className='main-input loader'/>
            :
            <input
                type={props.type}
                className="main-input"
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                disabled={props.isLoading}
            />
        }
    </div>
}