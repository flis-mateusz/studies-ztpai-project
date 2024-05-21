import '@styles/components/profile/profile-edit.css'
import {InputWithLoader} from "@components/InputWithLoader.tsx";
import {useAuth} from "@hooks/useAuth.tsx";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {AvatarWithLoader} from "@components/AvatarWithLoader.tsx";
import {useAxiosFormPost} from "@hooks/useAxiosFormPost.tsx";
import {IUser} from "@/interfaces/IUser.ts";
import {useAxiosMutation} from "@hooks/useAxiosMutation.tsx";
import {DefaultSuccessSwalToast} from "@/swal2/Popups.tsx";

interface FormValues {
    name: string
    surname: string
    names: string
    phone: string
    plainPassword: string
    rePlainPassword: string
}

export const ProfileEditPage = () => {
    const auth = useAuth()
    const [sectionWidth, setSectionWidth] = useState<number>(0)
    const sectionRef = useRef<HTMLDivElement>(null)

    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        surname: '',
        names: '',
        phone: '',
        plainPassword: '',
        rePlainPassword: ''
    })

    const userAPIUrl = `/api/users/${auth.user?.id}`

    const avatarMutation = useAxiosFormPost<IUser>(`${userAPIUrl}/avatar`, {
        mutationOptions: {
            mutationKey: ['USER_AVATAR_POST'],
            onSuccess: (data) => {
                auth.updateUser({
                    avatar: {
                        contentUrl: data.avatar.contentUrl
                    }
                })
                DefaultSuccessSwalToast()
            }
        },
    })

    const profileMutation = useAxiosMutation<unknown, IUser>(userAPIUrl, {
        method: 'PATCH',
        mutationOptions: {
            mutationKey: ['USER_PROFILE_EDIT'],
            onSuccess: (data) => {
                setFormValues(prevState => ({
                    ...prevState,
                    plainPassword: '',
                    rePlainPassword: ''
                }))
                auth.updateUser(data)
                DefaultSuccessSwalToast()
            }
        }
    })

    const avatarDeleteMutation = useAxiosMutation<null, IUser>(`${userAPIUrl}/avatar`, {
        method: 'DELETE',
        mutationOptions: {
            mutationKey: ['USER_AVATAR_DELETE'],
            onMutate: () => {
                auth.updateUser({
                    avatar: undefined
                })
                DefaultSuccessSwalToast()
            }
        }
    })

    useEffect(() => {
        if (auth.user) {
            setFormValues(prevState => ({
                ...prevState,
                name: auth.user!.name,
                surname: auth.user!.surname,
                names: `${auth.user!.name} ${auth.user!.surname}`,
                phone: auth.user!.phone || prevState.phone,
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
        const value = e.target.value

        if (field === "names") {
            const parts = value.split(/\s+/).filter(part => part)
            const newName = parts[0] || ''
            const newSurname = parts.slice(1).join(' ') || ''
            setFormValues(prev => ({
                ...prev,
                name: newName,
                surname: newSurname,
                names: value
            }))
        } else {
            setFormValues(prev => ({
                ...prev,
                [field]: value
            }))
        }
    }

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        if (!file) return;

        const fd = new FormData();
        fd.append("file", file);

        avatarMutation.mutate(fd)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        profileMutation.mutate(formValues)
    }

    const isLoading = auth.isAuthPending || profileMutation.isPending

    return <>
        <form className="with-absolute-loader" autoComplete="off" onSubmit={handleSubmit}>
            <div>
                <section ref={sectionRef}>
                    <InputWithLoader
                        label="Twoje imię i nazwisko"
                        type="text"
                        value={formValues.names}
                        onChange={handleChange('names')}
                        name="edit-names"
                        isLoading={isLoading}
                        loaderWidth={sectionWidth}
                    />
                    <InputWithLoader
                        label="Twój adres e-mail"
                        type="email"
                        value={auth.user?.email || ''}
                        onChange={() => {}}
                        name="edit-email"
                        isLoading={isLoading}
                        loaderWidth={sectionWidth}
                        disabled
                    />
                    <InputWithLoader
                        label="Twój numer telefonu"
                        type="text"
                        value={formValues.phone}
                        onChange={handleChange('phone')}
                        name="edit-phone"
                        isLoading={isLoading}
                        loaderWidth={sectionWidth}
                    />
                    <InputWithLoader
                        label="Ustaw nowe hasło"
                        type="password"
                        value={formValues.plainPassword}
                        onChange={handleChange('plainPassword')}
                        name="edit-password"
                        isLoading={isLoading}
                        loaderWidth={sectionWidth}
                    />
                    <InputWithLoader
                        label="Powtórz nowe hasło"
                        type="password"
                        value={formValues.rePlainPassword}
                        onChange={handleChange('rePlainPassword')}
                        name="edit-repassword"
                        isLoading={isLoading}
                        loaderWidth={sectionWidth}
                    />
                </section>
                <section className="align-end">
                    <div className="avatar-form">
                        <div className={`avatar-container ${auth.user ? 'loaded' : ''}`}>
                            <input className="mobile-avatar-checkbox" type="checkbox" id="mobile-avatar-checkbox"/>
                            <label className="mobile-avatar-checkbox-overlay" htmlFor="mobile-avatar-checkbox"> </label>
                            <AvatarWithLoader isLoading={auth.isAuthPending || avatarMutation.isPending}
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
                                        className={`avatar-action remove ${!auth.user.avatar ? 'hidden' : null}`}
                                        onClick={() => {
                                            avatarDeleteMutation.mutate(null)
                                        }}
                                    >
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
            {
                isLoading ? null :
                    <div className="submit-container">
                        <input type="submit" value="Zapisz" className="main-button normal-text"/>
                    </div>
            }
        </form>
    </>
}