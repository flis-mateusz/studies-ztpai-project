import {Helmet} from "react-helmet-async"

import '@styles/announcements/announcement-form.css'
import '@styles/components/custom-radio.css'
import '@styles/components/forms.css'

export const AnnouncementEditPage = () => {
    return <>
        <Helmet><title>Formularz ogłoszenia</title></Helmet>

        <form id="announcement-add-form">
            <fieldset className="scroll-to">
                <div className="field">
                    <div>Imię*</div>
                    <div className="info">Jeśli Twój zwierzak reaguje na konkretne imię, podaj je. W przeciwnym wypadku
                        to odpowiedni moment na nadanie imienia
                    </div>
                    <div>
                        <input type="text" className="main-input" name="pet-name" value=""/>
                    </div>
                </div>
                <div className="field">
                    <div>Wiek</div>
                    <div className="info">Postaraj się oszacować wiek zwierzęcia. Jeśli nie jesteś w stanie tego zrobić,
                        pozostaw to pole puste
                    </div>
                    <div>
                        <div className="input-with-select input-related">
                            <input type="number" min="1" className="main-input" name="pet-age" value=""/>
                            <select name="pet-age-type">
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
                        <input type="radio" name="pet-gender" value="male" id="pet-gender-male"/>
                        <label htmlFor="pet-gender-male">On</label>
                        <input type="radio" name="pet-gender" value="female" id="pet-gender-female"/>
                        <label htmlFor="pet-gender-female">Ona</label>
                    </div>
                    <span className="input-error"></span>
                </div>
            </fieldset>
            <fieldset className="scroll-to">
                <div className="field">
                    <div>Zdjęcie*</div>
                    <div className="info">Dodaj zdjęcie w formacie jpg, jped, png lub gif</div>
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
                    <div className="input-related">
                    </div>
                </div>

                <div className="field">
                    <div>Gatunek</div>
                    <div className="info">Jeśli nie znasz gatunku, pozostaw to pole puste</div>
                    <div>
                        <input type="text" className="main-input" id="pet-kind" name="pet-kind" value=""/>
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
                <span className="input-error pet-characteristics"></span>
            </fieldset>
            <fieldset className="scroll-to">
                <div className="field">
                    <div>Opis</div>
                    <div className="info">Podaj szczegółowe informacje o zwierzaku, a unikniesz pytań od
                        zainteresowanych
                    </div>
                    <div>
                        <textarea name="pet-description" id="pet-description" cols="30" rows="5" className="main-input"
                                  maxLength="2000" minLength="1"></textarea>
                        <div className="counter">
                            <span className="input-error font-inherit"></span>
                            <div>
                                <span className="current"></span><span>/ 2000</span>
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
                        <input type="text" className="main-input" name="pet-location" value=""/>
                    </div>
                </div>
                <div className="field">
                    <div>Cena</div>
                    <div className="info">Jeśli chcesz oddać zwierzaka za darmo pozostaw to pole puste</div>
                    <div>
                        <input type="number" className="main-input" min='0' name="pet-price" value=""/>
                    </div>
                </div>
            </fieldset>
            <div style={{width: 'unset !important'}}>
                <input type="submit" value="Dodaj ogłoszenie" className="main-button"/>
            </div>
        </form>
    </>
}