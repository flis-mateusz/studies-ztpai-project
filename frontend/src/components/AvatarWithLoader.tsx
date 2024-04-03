import {CustomContentLoader} from "@components/Loaders.tsx";
import {ReactNode} from "react";

interface Props {
    isLoading: boolean
    url?: string | null
    responsive?: boolean
    width?: number
    height?: number
    children?: ReactNode
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}

export const AvatarWithLoader = (props: Props) => {
    return props.isLoading ?
        <CustomContentLoader width={props.responsive ? 1 : props.width!} height={props.responsive ? 1 : props.height!}
                             className={`avatar ${props.responsive ? 'resp' : ''} loader`}
        />
        :
        <div className={`avatar ${props.responsive ? 'resp' : ''}`}
             style={props.url ? {backgroundImage: `url(${props.url})`} : {}}
             onMouseEnter={props.onMouseEnter}
             onMouseLeave={props.onMouseLeave}
        >
            {props.children}
        </div>
}