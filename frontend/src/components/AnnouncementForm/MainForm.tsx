import {Autocomplete, TextField} from "@mui/material";
import {IAnimalType, IAnnouncementDetail} from "@/interfaces/App.ts";
import {ChangeEvent, FormEvent} from "react";
import {IHydraCollection, IHydraExtension} from "@/interfaces/Hydra.ts";
import {
    AttachmentFormDropzoneWithPreview,
    IDropzoneActions
} from "@components/AnnouncementForm/AttachmentFormDropzoneWithPreview.tsx";
import {AnimalFeaturesSelect, IAnimalFeaturesSelectProps} from "@components/AnnouncementForm/AnimalFeaturesSelect.tsx";

export interface IAnnouncementForm extends Omit<IAnnouncementDetail, 'announcementAnimalFeatures' | 'age' | 'price'> {
    animalType?: string | null
    animalTypeInputValue: string
    age?: number | string
    price?: number | string
}

interface Props extends IDropzoneActions, IAnimalFeaturesSelectProps {
    exists: boolean
    state: IAnnouncementForm
    handleFormChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    updateForm: (name: string, value: string | number | null) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    animalTypes?: IHydraCollection<IAnimalType & IHydraExtension>
}

export const MainForm = (props: Props) => {
    return <form id="announcement-add-form" onSubmit={props.handleSubmit}>
        <fieldset className="scroll-to">
            <div className="field">
                <div>Imię*</div>
                <div className="info">Jeśli Twój zwierzak reaguje na konkretne imię, podaj je. W przeciwnym wypadku
                    to odpowiedni moment na nadanie imienia
                </div>
                <div>
                    <input type="text" className="main-input" name="name" value={props.state.name}
                           onChange={props.handleFormChange}/>
                </div>
            </div>
            <div className="field">
                <div>Wiek</div>
                <div className="info">Postaraj się oszacować wiek zwierzęcia. Jeśli nie jesteś w stanie tego zrobić,
                    pozostaw to pole puste
                </div>
                <div>
                    <div className="input-with-select input-related">
                        <input type="number" min="1" className="main-input" name="age" value={props.state.age!}
                               onChange={props.handleFormChange}/>
                        <select name="ageType" value={props.state.ageType} onChange={props.handleFormChange}>
                            <option value="day">dni</option>
                            <option value="month">miesięcy</option>
                            <option value="year">lat</option>
                        </select>
                    </div>
                    <span className="input-error"></span>
                </div>
            </div>
            <div className="field">
                <div>Płeć</div>
                <div className="toggle row">
                    <input id='pet-gender-male' type="radio" name="gender" value='male'
                           checked={props.state.gender === 'male'} onChange={props.handleFormChange}/>
                    <label htmlFor="pet-gender-male">On</label>
                    <input id='pet-gender-female' type="radio" name="gender" value='female'
                           checked={props.state.gender === 'female'} onChange={props.handleFormChange}/>
                    <label htmlFor="pet-gender-female">Ona</label>
                </div>
                <span className="input-error"></span>
            </div>
        </fieldset>
        <fieldset className="scroll-to">
            <div className="field">
                <div>Zdjęcie*</div>
                <div className="info">Dodaj zdjęcie w formacie jpg, jped, png lub gif</div>
                <AttachmentFormDropzoneWithPreview multiple
                                                   handleNewFile={props.handleNewFile}
                                                   handleFileDelete={props.handleFileDelete} files={props.files}/>
                <span className="input-error"></span>
                <div className="tip">
                    <span>Jakość zdjęcia wpływa na atrakcyjność ogłoszenia</span>
                </div>
            </div>
        </fieldset>
        <fieldset className="scroll-to">
            <div className="field">
                <div>Typ zwierzęcia*</div>
                <div className="info">Przykładowo kot, pies, chomik, papuga</div>
                <Autocomplete
                    value={props.state.animalType}
                    inputValue={props.state.animalTypeInputValue}
                    id="combo-box-demo"
                    options={props.animalTypes ? props.animalTypes['hydra:member'].map((option) => option.name) : []}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(_event, newValue: string | null) => {
                        props.updateForm('animalType', newValue);
                    }}
                    onInputChange={(_event, newValue: string | null) => {
                        props.updateForm('animalTypeInputValue', newValue)
                    }}
                />
            </div>

            <div className="field">
                <div>Gatunek</div>
                <div className="info">Jeśli nie znasz gatunku, pozostaw to pole puste</div>
                <div>
                    <input type="text" className="main-input" name='kind' value={props.state.kind}
                           onChange={props.handleFormChange}/>
                </div>
            </div>
        </fieldset>
        <fieldset className="scroll-to">
            <div className="field">
                <div>Cechy</div>
                <div className="info">Zaznacz tylko te pola, które dotyczą zwierzaka oraz co do których masz
                    absolutną pewność
                </div>
            </div>
            <AnimalFeaturesSelect animalFeatures={props.animalFeatures}
                                  animalFeaturesState={props.animalFeaturesState}
                                  handleAnimalFeaturesChange={props.handleAnimalFeaturesChange}
            />
            <span className="input-error pet-characteristics"></span>
        </fieldset>
        <fieldset className="scroll-to">
            <div className="field">
                <div>Opis</div>
                <div className="info">Podaj szczegółowe informacje o zwierzaku, a unikniesz pytań od
                    zainteresowanych
                </div>
                <div>
                        <textarea name="description" id="pet-description"
                                  cols={30}
                                  rows={5}
                                  className="main-input"
                                  maxLength={2000}
                                  minLength={1}
                                  value={props.state.description}
                                  onChange={props.handleFormChange}></textarea>
                    <div className="counter">
                        <span className="input-error font-inherit"></span>
                        <div>
                            <span className="current"></span><span>{props.state.description.length} / 2000</span>
                        </div>
                    </div>
                </div>
                <div className="tip">
                    <span>Dokładny i rzetelny opis statystycznie zwiększa szansę na adopcję zwierzaka</span>
                </div>
            </div>
        </fieldset>
        <fieldset className="scroll-to">
            <div className="field">
                <div>Lokalizacja*</div>
                <div className="info">Wpisz miasto, w którym zwykle zwierzak przebywa</div>
                <div>
                    <input type="text"
                           className="main-input"
                           name="locality"
                           value={props.state.locality}
                           onChange={props.handleFormChange}/>
                </div>
            </div>
            <div className="field">
                <div>Cena</div>
                <div className="info">Jeśli chcesz oddać zwierzaka za darmo pozostaw to pole puste</div>
                <div>
                    <input type="number"
                           className="main-input"
                           min='0'
                           name="price"
                           value={props.state.price!}
                           onChange={props.handleFormChange}/>
                </div>
            </div>
        </fieldset>
        {
            props.exists ?
                <div className="tip reversed right">
                    <span>Ogłoszenie będzie musiało przejść ponowną weryfikację</span>
                </div>
                : null
        }
        <div style={{width: 'unset !important'}}>
            <input type="submit" value={props.exists ? 'Edytuj ogłoszenie' : 'Dodaj ogłoszenie'}
                   className="main-button"/>
        </div>
    </form>
}