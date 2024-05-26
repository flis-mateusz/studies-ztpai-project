import '@styles/filter-select.css'
import {FilterOption} from "@components/Filters/AnnouncementsFilters/FilterOption.tsx";
import {IAnimalFeature, IAnimalType} from "@/interfaces/App.ts";
import {useAuth} from "@hooks/useAuth.tsx";
import {FilterLoader} from "@components/Filters/AnnouncementsFilters/FilterLoader.tsx";

export interface IFilters {
    search?: string
    free: string | null
    favourite: string | null
    features: Record<string, '0' | '1'>
    types: string[]
}

interface Props {
    filters: IFilters
    handleChange: (name: string, value: unknown) => void
    animalFeatures?: IAnimalFeature[]
    animalTypes?: IAnimalType[]
}

export const FilterSelect = (props: Props) => {
    const auth = useAuth()

    const toggleValue = (currentValue: string | null): '1' | '0' | null => currentValue === '1' ? '0' : currentValue === '0' ? null : '1'

    const handleChange = (field: keyof IFilters, currentValue: string | null) => {
        const newValue = toggleValue(currentValue)
        props.handleChange(field, newValue)
    }

    const handleFreeChange = () => handleChange('free', props.filters.free)
    const handleFavouriteChange = () => handleChange('favourite', props.filters.favourite)

    const handleTypeChange = (id: string) => {
        const newTypes = new Set<string>(props.filters.types)
        if (newTypes.has(id)) {
            newTypes.delete(id)
        } else {
            newTypes.add(id)
        }
        props.handleChange('types', Array.from(newTypes))
    }

    const handleFeatureChange = (id: string) => {
        const currentFeatureValue = props.filters.features[id]
        const newFeatureValue = toggleValue(currentFeatureValue)
        const newFeatures: Record<string, '0' | '1' | null> = {...props.filters.features}

        if (newFeatureValue === null) {
            delete newFeatures[id]
        } else {
            newFeatures[id] = newFeatureValue
        }

        props.handleChange('features', newFeatures)
    }


    return <>
        <div className="filter-container">
            <div className="options">
                <FilterOption name={'Oddam za darmo'}
                              value={props.filters.free}
                              handleChange={handleFreeChange}/>
                {
                    auth.user ?
                        <FilterOption name={'Obserwowane'}
                                      value={props.filters.favourite}
                                      handleChange={handleFavouriteChange}/>
                        : null
                }
            </div>
        </div>
        <div className="filter-container">
            <div>Typy zwierząt</div>
            <div className="options">
                {
                    props.animalTypes && props.animalTypes.length ? props.animalTypes.map(type =>
                        <FilterOption key={type.id}
                                      name={type.name}
                                      id={type.id.toString()}
                                      value={props.filters.types.includes(type.id.toString()) ? '1' : null}
                                      handleChange={handleTypeChange}/>
                    ) : <FilterLoader count={15}/>
                }
            </div>
        </div>
        <div className="filter-container">
            <div>Cechy zwierząt</div>
            <div className="options">
                {
                    props.animalFeatures && props.animalFeatures.length ? props.animalFeatures.map(feature =>
                        <FilterOption key={feature.id}
                                      name={feature.name}
                                      id={feature.id.toString()}
                                      value={props.filters.features[feature.id.toString()]}
                                      handleChange={handleFeatureChange}/>
                    ) : <FilterLoader count={15}/>
                }
            </div>
        </div>
    </>
}