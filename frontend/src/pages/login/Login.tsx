import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios, { AxiosRequestConfig } from "axios";
import jwt from 'jsonwebtoken';

import styles from './Login.module.css'
import useUserContext from "../../hooks/UserContext";

type Inputs = {
    username: string
    password: string
}

function Login() {
    const { login } = useUserContext()
    const {
        register,
        handleSubmit,
        formState: { errors },
    }  = useForm<Inputs>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const username = data.username
        const password = data.password
        const user = new FormData()
        user.append('username', username)
        user.append('password', password)

        const options: AxiosRequestConfig = {
            params: {'': ''},
            headers: {'content-type': 'application/json'},
            withCredentials: true,
        };
        axios.post('http://localhost:4321/login', user, options)
        .then((res) => {
            if(res.data.loginOk) {
                login(res.data.username)
            } else {
                alert('Incorrect username and/or password')
            }
        })
    }
    return(
        <div className={styles.card}>
            <h1>Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.inputLogin} type="text" placeholder="Username" {...register('username', {required: true})} />
                {errors.username && <p>You must enter a username.</p>}
                <input className={styles.inputLogin} type="password" placeholder="Password" {...register('password', {required: true})} />
                {errors.password && <p>You must enter a password.</p>}
                <button className={styles.loginButton} type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login