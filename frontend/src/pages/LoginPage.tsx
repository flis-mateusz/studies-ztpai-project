import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "@hooks/useAuth.tsx";
import {Helmet} from "react-helmet-async";
import Swal from 'sweetalert2'

import '@styles/login.css'
import '@styles/components/forms.css'
import {useEffect, useRef, useState} from "react";
import {LoginSection} from "@components/Login/LoginSection.tsx";
import {RegisterSection} from "@components/Login/RegisterSection.tsx";
import {ForgotPasswordSection} from "@components/Login/ForgotPasswordSection.tsx";
import {CustomContentLoader} from "@components/CustomContentLoader.tsx";

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

    const handleFormChange = (newFormName: string) => {
        setCurrentFormClass(newFormName)
    }

    const handleLogin = (email: string, password: string) => {
        auth.signIn({
            email: email, password: password,
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
                    <LoginSection handleFormChange={handleFormChange} handleLogin={handleLogin}/>
                    <RegisterSection handleFormChange={handleFormChange}/>
                    <ForgotPasswordSection handleFormChange={handleFormChange}/>
                </section>
                <CustomContentLoader visible={auth.isAuthPending}/>
            </section>
        </>
    )
}
