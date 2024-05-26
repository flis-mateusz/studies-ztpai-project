import {CustomContentLoader} from "@components/Loaders.tsx";

interface Props {
    count: number
}

export const FilterLoader = (props: Props) => {
    return <div className='loaders'>
        {
            Array.from({ length: props.count }, (_, index) => (
                <CustomContentLoader key={index} width={100} height={10} />
            ))
        }
    </div>
}