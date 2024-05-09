import '@styles/components/profile/profile-edit.css'
import {InputWithLoader} from "@components/InputWithLoader.tsx";
import {useAuth} from "@hooks/useAuth.tsx";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {AvatarWithLoader} from "@components/AvatarWithLoader.tsx";
import {useAxiosFormPost} from "@hooks/useAxiosFormPost.tsx";
import {IUser} from "@/types/IUser.ts";

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
        repassword: ''
    })

    const {isPending, mutate} = useAxiosFormPost<IUser>(`/api/users/${auth.user?.id}/avatar`, {
        mutationOptions: {
            mutationKey: ['USER_AVATAR_POST'],
            onSuccess: (data) => {
                auth.updateUser({
                    avatar: {
                        contentUrl: data.avatar.contentUrl
                    }
                })
            }
        },
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
        setFormValues(prevState => ({
            ...prevState,
            [field]: e.target.value
        }))
    }

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        if (!file) return;

        const fd = new FormData();
        fd.append("file", file);

        mutate(fd)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
                            <AvatarWithLoader isLoading={auth.isAuthPending || isPending}
                                              mediaObject={auth.user?.avatar}
                                              responsive={true}>
                                <input type="file" className="main-input" id="edit-avatar" name="edit-avatar"
                                       onChange={handleAvatarChange}
                                />
                            </AvatarWithLoader>
                            {
                                auth.user && <>
                                    <label htmlFor="edit-avatar" className="avatar-action upload">
                                        <i className="material-icons">file_upload</i>
                                    </label>
                                    <label
                                        className={`avatar-action remove ${!auth.user.avatar ? 'hidden' : null}`}>
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