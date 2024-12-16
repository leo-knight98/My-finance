import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosRequestConfig } from "axios";

import styles from './Login.module.css';
import useUserContext from "../../hooks/UserContext";
import Loading from "../loading/Loading";

type Inputs = {
    username: string;
    password: string;
};

function Login() {
    const { login } = useUserContext();
    const [message, setMessage] = useState<"success" | "error" | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const username = data.username;
        const password = data.password;
        const user = new FormData();
        user.append('username', username);
        user.append('password', password);

        const options: AxiosRequestConfig = {
            headers: { 'content-type': 'application/json' },
            withCredentials: true,
        };

        setIsLoading(true); // Inicia la carga
        axios.post('http://localhost:4321/login', user, options)
            .then((res) => {
                if (res.data.loginOk) {
                    login(res.data.username);
                    setMessage("success");
                } else {
                    setMessage("error");
                }
            })
            .catch(() => setMessage("error"))
            .finally(() => setIsLoading(false)); // Detiene la carga
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={styles.card}>
                    <h1 className={styles.loginFormTitle}>Login</h1>
                    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                        {/* Username Input */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>Username:</label>
                            <input
                                id="username"
                                className={styles.inputLogin}
                                type="text"
                                placeholder="Enter your username"
                                {...register('username', { required: "Username is required" })}
                            />
                            {errors.username && <p className={styles.formError}>{errors.username.message}</p>}
                        </div>
                        
                        {/* Password Input */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>Password:</label>
                            <input
                                id="password"
                                className={styles.inputLogin}
                                type="password"
                                placeholder="Enter your password"
                                {...register('password', { required: "Password is required" })}
                            />
                            {errors.password && <p className={styles.formError}>{errors.password.message}</p>}
                        </div>

                        {/* Botón de envío */}
                        <button className={styles.loginButton} type="submit">Login</button>
                    </form>

                    {/* Mensaje */}
                    {message && (
                        <div className={styles.messageContainer}>
                            {message === "success" && <button className={styles.successButton}>¡Login Exitoso!</button>}
                            {message === "error" && <button className={styles.errorButton}>Error en el ingreso</button>}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Login;
