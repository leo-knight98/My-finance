import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axiosClient from "../../config/axiosClient";
import useUserContext from "../../hooks/UserContext";
import Loading from "../loading/Loading";
import styles from "./Login.module.css";

type Inputs = {
    username: string;
    password: string;
};

function ErrorMessage({ error }: { error?: string }) {
    return error ? (
        <div className={styles.formError}>{error}</div>
    ) : null;
}

function SuccessMessage({ message }: { message?: string }) {
    return message ? (
        <div className={styles.successStatus}>{message}</div>
    ) : null;
}

function Login() {
    const { login } = useUserContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorStatus, setErrorStatus] = useState<string | undefined>(undefined);
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
    const [serverError, setServerError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        setErrorStatus(undefined);
        setServerError(false);
        setSuccessMessage(undefined);

        try {
            const options = { headers: { "Content-Type": "application/json" } };
            const res = await axiosClient.post("/login", data, options);

            if (res.status === 200 && res.data.loginOk) {
                setSuccessMessage("¡Inicio de sesión exitoso! 🎉");
                login(res.data.username);
            } else {
                setErrorStatus("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            setErrorStatus("Error del servidor.");
            setServerError(true);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseServerError = () => {
        setServerError(false);
        setErrorStatus(undefined);
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={styles.card}>
                    <h1 className={styles.loginFormTitle}>Login</h1>
                    
                    {/* Mostrar error general transparente */}
                    {errorStatus && (
                        <div className={styles.errorStatus}>
                            {errorStatus}
                        </div>
                    )}

                    {/* Mostrar éxito */}
                    {successMessage && (
                        <SuccessMessage message={successMessage} />
                    )}

                    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                        {/* Username Input */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>
                                Username:
                            </label>
                            <input
                                id="username"
                                className={styles.inputLogin}
                                type="text"
                                placeholder="Enter your username"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && (
                                <ErrorMessage error={errors.username.message} />
                            )}
                        </div>

                        {/* Password Input */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Password:
                            </label>
                            <input
                                id="password"
                                className={styles.inputLogin}
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && (
                                <ErrorMessage error={errors.password.message} />
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className={styles.inputGroup}>
                            <button className={styles.loginButton} type="submit">
                                Login
                            </button>
                        </div>
                    </form>

                    {/* Mostrar error de servidor al fondo */}
                    {serverError && (
                        <div className={styles.serverErrorContainer}>
                            <button
                                className={styles.serverErrorButton}
                                onClick={handleCloseServerError}
                            >
                                Error del servidor. Haz clic para cerrar.
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Login;
