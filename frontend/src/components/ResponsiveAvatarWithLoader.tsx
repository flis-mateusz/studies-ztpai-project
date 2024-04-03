import {CustomContentLoader} from "@components/Loaders.tsx";
import {ReactNode} from "react";

interface Props {
    isLoading: boolean
    url?: string | null
    children?: ReactNode;
}

export const ResponsiveAvatarWithLoader = (props: Props) => {
    return props.isLoading ?
        <CustomContentLoader width={1} height={1} className='avatar resp loader'/>
        :
        <div className="avatar resp" style={props.url ? {backgroundImage: `url(${props.url})`} : {}}>
            {props.children}
        </div>
}