import {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "@hooks/useAuth.tsx";
import {Helmet} from "react-helmet";

export const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (event) => {
        event.preventDefault();

        auth.signIn('dd', 'aa')
            .then(()=>{
                navigate(from, {replace: true});
            })
            .catch((e)=>{

            })
    }

    return (
        <>
            <Helmet>
                <title>Logowanie</title>
            </Helmet>

            <Link to={'/'}>HOME</Link>
            <button
                onClick={handleSubmit}

            >LOGIN
            </button>
            <button
                onClick={()=>{
                    auth.signOut()
                }}

            >LOGIN
            </button>
            <div>{
                location.state?.error ? JSON.stringify(location.state.error) + location.state.error.message : ''
            }</div>
        </>
    )
}
