import {ISignUpData} from "@hooks/useAuth.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {ILoginFormProps} from "@components/Login/LoginSection.tsx";

interface ISignUpDataExtended extends ISignUpData {
    names: string,
    rePassword: string,
}

export const RegisterSection = ({handleFormChange, handleAction, isLoading}: ILoginFormProps<ISignUpData>) => {
    const [form, setForm] = useState<ISignUpDataExtended>(
        {
            email: '',
            names: '',
            name: '',
            surname: '',
            plainPassword: '',
            rePassword: '',
            phone: ''
        })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        if (name === "names") {
            const parts = value.split(/\s+/).filter(part => part)
            const newName = parts[0] || ''
            const newSurname = parts.slice(1).join(' ') || ''
            setForm(prev => ({
                ...prev,
                name: newName,
                surname: newSurname,
                names: value
            }))
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleAction(form)
    }

    return <section className="register-section">
        <div>
            <span>Utwórz konto</span>
            <hr/>
            <form id="register-form" autoComplete="off" className={`with-loader ${isLoading ? 'submitting' : null}`}
                  onSubmit={handleSubmit}>
                <div className="inputs">
                    <div>
                        <label htmlFor="register-names"><span>Imię i nazwisko</span></label>
                        <input type="text" autoComplete="off" className="main-input" id="register-names"
                               name="names" value={form.names} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="register-email"><span>Wprowadź adres e-mail</span></label>
                        <input type="email" autoComplete="off" className="main-input"
                               id="register-email" name="email" value={form.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="register-phone"><span>Wprowadź numer telefonu</span></label>
                        <input type="text" autoComplete="new-password" className="main-input"
                               id="register-phone" name="phone" value={form.phone} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="register-password"><span>Wprowadź hasło</span></label>
                        <input type="password" autoComplete="new-password" className="main-input"
                               id="register-password" name="plainPassword" value={form.plainPassword}
                               onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="register-repassword"><span>Powtórz hasło</span></label>
                        <input type="password" autoComplete="new-password" className="main-input"
                               id="register-repassword" name="rePassword" value={form.rePassword}
                               onChange={handleChange}/>
                    </div>
                </div>
                <span className="form-output"></span>
                <input type="submit" value="Zarejestruj się" className="main-button"/>
                <span className="incentive switch-form" onClick={() => {
                    handleFormChange('')
                }}>Posiadasz konto? Zaloguj się</span>
            </form>
        </div>
    </section>
}