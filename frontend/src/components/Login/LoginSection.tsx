import {FormEvent} from "react";
import {ISignInData} from "@hooks/useAuth.tsx";

export interface ILoginFormProps<T> {
    handleFormChange: (newFormName: string) => void
    handleAction: (params: T) => void
    isLoading: boolean
}

export const LoginSection = ({handleFormChange, handleAction, isLoading}: ILoginFormProps<ISignInData>) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleAction({
            email: 'o@o.o',
            password: '1233',
        })
    }

    return <section className="login-section">
        <div>
            <span className="login-successful">Witaj ponownie</span>
            <span className="login-successful-name">Zaloguj się lub utwórz konto za darmo</span>
            <hr/>
            <form id="login-form" className={`with-loader ${isLoading ? 'submitting' : null}`} onSubmit={handleSubmit}>
                <div className="inputs">
                    <div>
                        <label htmlFor="login-email"><span>Wprowadź adres e-mail</span></label>
                        <input type="email" className="main-input" id="login-email" name="login-email"/>
                    </div>
                    <div>
                        <label htmlFor="login-email"><span>Wprowadź hasło</span></label>
                        <input type="password" className="main-input" id="login-password"
                               name="login-password"/>
                        <span className="switch-form forgot-password" onClick={() => {
                            handleFormChange('forgot-password')
                        }}>Zapomniałem/am hasła</span>
                    </div>
                </div>
                <span className="form-output"></span>
                <input type="submit" value="Zaloguj" className="main-button"/>
                <span className="incentive switch-form" onClick={() => {
                    handleFormChange('register')
                }}>Zarejestruj się</span>
            </form>
        </div>
    </section>
}