import {useLocation, useNavigate} from "react-router-dom";
import {ISignInData, ISignUpData, useAuth} from "@hooks/useAuth.tsx";
import {Helmet} from "react-helmet-async";
import Swal from 'sweetalert2'

import '@styles/login.css'
import '@styles/components/forms.css'
import {useEffect, useRef, useState} from "react";
import {LoginSection} from "@components/Login/LoginSection.tsx";
import {RegisterSection} from "@components/Login/RegisterSection.tsx";
import {ForgotPasswordSection} from "@components/Login/ForgotPasswordSection.tsx";
import {AnimatedLoader} from "@components/AnimatedLoader.tsx";


export const LoginPage = () => {
    const formsContainerRef = useRef<HTMLElement | null>(null)
    const [currentFormClass, setCurrentFormClass] = useState<string>()
    const auth = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        if (location.state?.error) {
            Swal.fire({
                toast: true,
                text: location.state.error.message,
                icon: 'error',
                position: "top-start",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            })
        }
    }, [location.state?.error])

    useEffect(() => {
        if (auth.token) auth.signOut()
    }, [auth])

    const handleFormChange = (newFormName: string) => {
        setCurrentFormClass(newFormName)
    }

    const handleLogin = (params: ISignInData) => {
        auth.signIn({
            ...params,
            onSuccess: () => {
                navigate(from, {replace: true})
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    const handleRegister = (params: ISignUpData) => {
        auth.signUp({
            ...params,
            onSuccess: () => {
                navigate(from, {replace: true})
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    return (
        <>
            <Helmet><title>Logowanie</title></Helmet>

            <section className="welcome-image login-page"></section>
            <section className="forms-frame login-page">
                <section className={`forms-container ${currentFormClass}`} ref={formsContainerRef}>
                    <LoginSection handleFormChange={handleFormChange} handleAction={handleLogin}
                                  isLoading={auth.isAuthPending}/>
                    <RegisterSection handleFormChange={handleFormChange} handleAction={handleRegister}
                                     isLoading={auth.isAuthPending}/>
                    <ForgotPasswordSection handleFormChange={handleFormChange}/>
                </section>
                <AnimatedLoader visible={auth.isAuthPending}/>
            </section>
        </>
    )
}
