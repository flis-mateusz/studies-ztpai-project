import {MutableRefObject, ReactNode, useEffect, useState} from 'react';
import {CustomContentLoader} from "@components/Loaders.tsx";

interface UseGridLoadersParams {
    ref: MutableRefObject<HTMLElement | null>
    loaderCount?: number
    defaultWidth?: number
    loaderHeight?: number
    useColumnNumberAsCount?: boolean
}

const useGridLoaders = ({
                            ref,
                            loaderCount = 5,
                            defaultWidth = 150,
                            loaderHeight = 260,
                            useColumnNumberAsCount=false
                        }: UseGridLoadersParams) => {
    const [loaders, setLoaders] = useState<ReactNode>([])

    useEffect(() => {
        const updateLoaders = () => {
            if (ref.current) {
                const gridStyle = window.getComputedStyle(ref.current)
                const gridTemplateColumns = gridStyle.getPropertyValue('grid-template-columns').split(' ')
                const gridColumnsNumber = gridTemplateColumns.length
                let itemWidth = defaultWidth

                if (gridColumnsNumber > 0) {
                    const columnWidth = parseInt(gridTemplateColumns[0], 10)
                    itemWidth = gridColumnsNumber > 1 ? columnWidth : columnWidth
                }

                const newLoaders = Array.from({length: useColumnNumberAsCount ? gridColumnsNumber : loaderCount}, (_, index) => (
                    <CustomContentLoader
                        key={index}
                        width={itemWidth}
                        height={loaderHeight}
                        className="announcement loader"
                    />
                ))

                setLoaders(newLoaders)
            }
        }

        window.addEventListener('resize', updateLoaders)

        updateLoaders()

        setTimeout(()=> {
            updateLoaders()
        }, 100)

        return () => {
            window.removeEventListener('resize', updateLoaders)
        }
    }, [ref, loaderCount, defaultWidth, loaderHeight, useColumnNumberAsCount])

    return loaders
};

export default useGridLoaders
