import {CustomContentLoader} from "@components/Loaders.tsx";
import {ReactNode} from "react";
import {IMediaObject} from "@/interfaces/IMediaObject.ts";
import {absoluteServerPath} from "@/utils/utils.ts";

interface Props {
    isLoading: boolean
    mediaObject?: IMediaObject
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
             style={props.mediaObject ? {backgroundImage: `url(${absoluteServerPath(props.mediaObject.contentUrl)})`} : {}}
             onMouseEnter={props.onMouseEnter}
             onMouseLeave={props.onMouseLeave}
        >
            {props.children}
        </div>
}