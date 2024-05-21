import {IAnimalFeature} from "@/interfaces/App.ts";
import {ChangeEvent} from "react";
import {IHydraExtension} from "@/interfaces/Hydra.ts";

interface Props {
    feature: IAnimalFeature
    handleOptionChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: boolean | null
}

export const AnimalFeatureOption = (props: Props) => {
    const label = `pet-charac-${props.feature.id}`
    const hydraId = (props.feature as IAnimalFeature & IHydraExtension)['@id']

    return <div>
        <div>{props.feature.name}</div>
        <div className="checkboxes">
            <input type="radio"
                   name={hydraId}
                   id={`${label}-yes`}
                   value="2"
                   checked={props.value === true}
                   onChange={props.handleOptionChange}/>
            <label className="yes" htmlFor={`${label}-yes`}>Tak</label>

            <input type="radio"
                   name={hydraId}
                   id={`${label}-no`}
                   value="1"
                   checked={props.value === false}
                   onChange={props.handleOptionChange}/>
            <label className="no" htmlFor={`${label}-no`}>Nie</label>

            <input type="radio"
                   name={hydraId}
                   id={`${label}-none`}
                   value="0"
                   checked={props.value === null}
                   onChange={props.handleOptionChange}/>
            <label className="not-sure" htmlFor={`${label}-none`}>Nie wiem</label>
        </div>
    </div>
}