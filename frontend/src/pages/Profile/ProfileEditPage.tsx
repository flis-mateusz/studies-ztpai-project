import '@styles/components/profile/profile-edit.css'
import {InputWithLoader} from "@components/InputWithLoader.tsx";
import {useAuth} from "@hooks/useAuth.tsx";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {AvatarWithLoader} from "@components/AvatarWithLoader.tsx";

interface FormValues {
    name: string
    email: string
    phone: string
    password: string
    repassword: string
    avatar: File | null
}

export const ProfileEditPage = () => {
    const auth = useAuth()
    const [sectionWidth, setSectionWidth] = useState<number>(0)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null)

    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
        phone: '',
        password: '',
        repassword: '',
        avatar: null
    })

    useEffect(() => {
        if (auth.user) {
            setFormValues(prevState => ({
                ...prevState,
                name: auth.user?.name || prevState.name,
                email: auth.user?.email || prevState.email,
                phone: auth.user?.phone || prevState.phone,
            }))
        }
    }, [auth.user])

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
        if (field === 'avatar' && e.target.files) {
            const file = e.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setAvatarPreview(reader.result as string)
                }
                reader.readAsDataURL(file)
            }
            setFormValues(prevState => ({
                ...prevState,
                [field]: file ?? null
            }))
        } else {
            setFormValues(prevState => ({
                ...prevState,
                [field]: e.target.value
            }))
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        auth.updateUser({
            avatarUrl: avatarPreview as string
        })
        setAvatarPreview(null)
        console.log(auth.user?.avatarUrl)
    }

    return <>
        <form className="with-absolute-loader" autoComplete="off" onSubmit={handleSubmit}>
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
                            <AvatarWithLoader isLoading={auth.isAuthPending}
                                              url={avatarPreview || auth.user?.avatarUrl}
                                              responsive={true}>
                                <input type="file" className="main-input" id="edit-avatar" name="edit-avatar"
                                       onChange={handleChange('avatar')}
                                />
                            </AvatarWithLoader>
                            {
                                auth.user && <>
                                    <label htmlFor="edit-avatar" className="avatar-action upload">
                                        <i className="material-icons">file_upload</i>
                                    </label>
                                    <label
                                        className={`avatar-action remove ${!auth.user.avatarUrl ? 'hidden' : null}`}>
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