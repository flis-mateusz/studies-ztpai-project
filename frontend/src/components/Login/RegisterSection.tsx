export const RegisterSection = ({ handleFormChange }: { handleFormChange: (newFormName: string) => void }) => {
    return <section className="register-section">
        <div>
            <span>Utwórz konto</span>
            <hr/>
            <form id="register-form" autoComplete="off" className="with-loader">
                <div className="inputs">
                    <div>
                        <label htmlFor="register-names"><span>Imię i nazwisko</span></label>
                        <input type="text" autoComplete="off" className="main-input" id="register-names"
                               name="register-names"/>
                    </div>
                    <div>
                        <label htmlFor="register-email"><span>Wprowadź adres e-mail</span></label>
                        <input type="email" autoComplete="off" className="main-input"
                               id="register-email" name="register-email"/>
                    </div>
                    <div>
                        <label htmlFor="register-phone"><span>Wprowadź numer telefonu</span></label>
                        <input type="text" autoComplete="new-password" className="main-input"
                               id="register-phone" name="register-phone"/>
                    </div>
                    <div>
                        <label htmlFor="register-password"><span>Wprowadź hasło</span></label>
                        <input type="password" autoComplete="new-password" className="main-input"
                               id="register-password" name="register-password"/>
                    </div>
                    <div>
                        <label htmlFor="register-repassword"><span>Powtórz hasło</span></label>
                        <input type="password" autoComplete="new-password" className="main-input"
                               id="register-repassword" name="register-repassword"/>
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