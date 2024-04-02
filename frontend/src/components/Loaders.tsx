import ContentLoader from "react-content-loader";
import {CSSProperties} from "react";

export const CustomContentLoader = (props: {
    width: number
    height: number
    radius?: number
    style?: CSSProperties
    className?: string
}) => {
    const viewBox = '0 0 ' + props.width + ' ' + props.height
    return (
        <ContentLoader
            speed={1.5}
            style={props.style}
            width={props.width}
            height={props.height}
            viewBox={viewBox}
            className={props.className}
            backgroundColor="#ededed"
            foregroundColor="#d1d1d1"
        >
            <rect x="0" y="0" rx={props.radius} ry={props.radius} width={props.width} height={props.height}/>
        </ContentLoader>
    )
}