import '@styles/components/profile/profile-edit.css'
import {InputWithLoader} from "@components/InputWithLoader.tsx";
import {useAuth} from "@hooks/useAuth.tsx";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {ResponsiveAvatarWithLoader} from "@components/ResponsiveAvatarWithLoader.tsx";

interface FormValues {
    name: string
    email: string
    phone: string
    password: string
    repassword: string
}

export const ProfileEditPage = () => {
    const auth = useAuth()
    const [sectionWidth, setSectionWidth] = useState<number>(0)
    const sectionRef = useRef<HTMLDivElement>(null)

    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
        phone: '',
        password: '',
        repassword: '',
    })

    useEffect(() => {
        const updateWidth = () => {
            if (sectionRef.current) {
                setSectionWidth(sectionRef.current.offsetWidth)
            }
        }

        window.addEventListener('resize', updateWidth)
        updateWidth()

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleChange = (field: keyof FormValues) => (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    };

    return <>
        <form id="profile-edit-form" className="with-absolute-loader" autoComplete="off">
            <div>
                <section ref={sectionRef}>
                    <InputWithLoader
                        label="Twoje imię i nazwisko"
                        type="text"
                        value={formValues.name}
                        onChange={handleChange('name')}
                        name="edit-names"
                        isLoading={auth.isAuthPending}
                        loaderWidth={sectionWidth}
                    />
                    <InputWithLoader
                        label="Twój adres e-mail"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange('email')}
                        name="edit-email"
                        isLoading={auth.isAuthPending}
                        loaderWidth={sectionWidth}
                    />
                    <InputWithLoader
                        label="Twój numer telefonu"
                        type="text"
                        value={formValues.phone}
                        onChange={handleChange('phone')}
                        name="edit-phone"
                        isLoading={auth.isAuthPending}
                        loaderWidth={sectionWidth}
                    />
                    <InputWithLoader
                        label="Ustaw nowe hasło"
                        type="password"
                        value={formValues.password}
                        onChange={handleChange('password')}
                        name="edit-password"
                        isLoading={auth.isAuthPending}
                        loaderWidth={sectionWidth}
                    />
                    <InputWithLoader
                        label="Powtórz nowe hasło"
                        type="password"
                        value={formValues.repassword}
                        onChange={handleChange('repassword')}
                        name="edit-repassword"
                        isLoading={auth.isAuthPending}
                        loaderWidth={sectionWidth}
                    />
                </section>
                <section className="align-end">
                    <div className="avatar-form">
                        <div className={`avatar-container ${auth.user ? 'loaded' : ''}`}>
                            <input className="mobile-avatar-checkbox" type="checkbox" id="mobile-avatar-checkbox"/>
                            <label className="mobile-avatar-checkbox-overlay" htmlFor="mobile-avatar-checkbox"> </label>
                            <ResponsiveAvatarWithLoader isLoading={auth.isAuthPending} url={auth.user?.avatar}>
                                <input type="file" className="main-input" id="edit-avatar" name="edit-avatar"/>
                            </ResponsiveAvatarWithLoader>
                            {
                                auth.user && <>
                                    <label htmlFor="edit-avatar" className="avatar-action upload">
                                        <i className="material-icons">file_upload</i>
                                    </label>
                                    <label
                                        className="avatar-action remove <?php echo $user->getAvatarUrl() ? '' : 'hidden' ?>">
                                        <i className="material-icons">delete_forever</i>
                                    </label>
                                </>
                            }
                        </div>
                        <div className="tip avatar-tip hidden">
                            <span>Zmiany nie są jeszcze zapisane</span>
                        </div>
                    </div>
                </section>
            </div>
            <span className="form-output"></span>
            <div className="submit-container">
                <input type="submit" value="Zapisz" className="main-button normal-text"/>
            </div>
        </form>
    </>
}