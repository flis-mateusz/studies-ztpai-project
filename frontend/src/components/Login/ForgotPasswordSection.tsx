export const ForgotPasswordSection = ({ handleFormChange }: { handleFormChange: (newFormName: string) => void }) => {
    return <section className="forgot-password-section">
        <div>
            <span>Przypomnij hasło</span>
            <span>Na podany adres e-mail otrzymasz link do zresetowania hasła</span>
            <hr/>
            <form id="forgot-password-form" className="with-loader">
                <div className="inputs">
                    <div>
                        <label
                            htmlFor="forgot-password-email"><span>Wprowadź adres e-mail</span></label>
                        <input type="number" step="0.01" className="main-input"
                               id="forgot-password-email" name="forgot-password-email"/>
                    </div>
                </div>
                <span className="form-output"></span>
                <input type="submit" value="Wyślij link" className="main-button"/>
                <span className="incentive switch-form forgot-password" onClick={() => {
                    handleFormChange('')
                }}>Wróć do logowania</span>
            </form>
        </div>
    </section>
}