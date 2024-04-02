import {MutableRefObject, ReactNode, useEffect, useState} from 'react';
import {CustomContentLoader} from "@components/Loaders.tsx";

const useGridLoaders = (ref: MutableRefObject<HTMLElement | null>, loaderCount = 5, defaultWidth = 150, loaderHeight = 260) => {
    const [loaders, setLoaders] = useState<ReactNode>([])

    useEffect(() => {
        const updateLoaders = () => {
            if (ref.current) {
                const gridStyle = window.getComputedStyle(ref.current)
                const gridTemplateColumns = gridStyle.getPropertyValue('grid-template-columns').split(' ')
                let itemWidth = defaultWidth

                if (gridTemplateColumns.length > 0) {
                    const columnWidth = parseInt(gridTemplateColumns[0], 10)
                    itemWidth = gridTemplateColumns.length > 1 ? columnWidth : columnWidth
                }

                const newLoaders = Array.from({length: loaderCount}, (_, index) => (
                    <CustomContentLoader
                        key={index}
                        width={itemWidth}
                        height={loaderHeight}
                        className="announcement"
                    />
                ))

                setLoaders(newLoaders)
            }
        }

        updateLoaders()

        const handleResize = () => {
            updateLoaders()
        };

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [ref, loaderCount, defaultWidth, loaderHeight])

    return loaders
};

export default useGridLoaders
