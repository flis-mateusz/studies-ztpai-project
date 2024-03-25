import {useEffect, useState} from 'react'
import '../App.css'

export const Login = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('/api/get')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCount(data.count)
            });
    }, []);

    return (
        <>
            <div>{count}</div>
        </>
    )
}
