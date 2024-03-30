import ContentLoader from "react-content-loader";
import {CSSProperties} from "react";

export const CustomContentLoader = (props: {
    width: number
    height: number
    radius: number
    style?: CSSProperties
}) => {
    const viewBox = '0 0 ' + props.width + ' ' + props.height
    return (
        <ContentLoader
            speed={1}
            style={props.style}
            width={props.width}
            height={props.height}
            viewBox={viewBox}
        >
            <rect x="0" y="0" rx={props.radius} ry={props.radius} width={props.width} height={props.height}/>
        </ContentLoader>
    )
}