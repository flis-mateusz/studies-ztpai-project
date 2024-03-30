import {FormEvent} from "react";

interface ILoginActions {
    handleFormChange: (newFormName: string) => void
    handleLogin: (email: string, password: string) => void
}

export const LoginSection = ({handleFormChange, handleLogin}: ILoginActions) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleLogin('pwp@wp.pl', '123')
    }

    return <section className="login-section">
        <div>
            <span className="login-successful">Witaj ponownie</span>
            <span className="login-successful-name">Zaloguj się lub utwórz konto za darmo</span>
            <hr/>
            <form id="login-form" className="with-loader" onSubmit={handleSubmit}>
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