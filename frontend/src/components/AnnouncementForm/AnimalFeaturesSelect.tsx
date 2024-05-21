import '@styles/components/animal-features-select.css'
import {IAnimalFeature} from "@/interfaces/App.ts";
import {AnimalFeatureOption} from "@components/AnnouncementForm/AnimalFeatureOption.tsx";
import {IHydraCollection, IHydraExtension} from "@/interfaces/Hydra.ts";
import {ChangeEvent} from "react";

export interface IAnimalFeaturesSelectProps {
    animalFeatures?: IHydraCollection<IAnimalFeature>
    animalFeaturesState: Record<string, boolean | null>
    handleAnimalFeaturesChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AnimalFeaturesSelect = (props: IAnimalFeaturesSelectProps) => {
    return <div className="animal-features">
        {
            props.animalFeatures ? props.animalFeatures['hydra:member'].map(feature =>
                    <AnimalFeatureOption feature={feature}
                                         key={(feature as IAnimalFeature & IHydraExtension)['@id']}
                                         handleOptionChange={props.handleAnimalFeaturesChange}
                                         value={props.animalFeaturesState[(feature as IAnimalFeature & IHydraExtension)['@id']]}/>
                )
                :
                null
        }
    </div>
}