import { useForm, SubmitHandler, FieldValues, UseFormRegisterReturn } from "react-hook-form";
import styles from './Register.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../loading/Loading";

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

function ErrorMessage({ error }: { error?: string }) {
    return error ? (
        <div className={styles.errorStatus}>{error}</div>
    ) : null;
}

function InputField({
    label,
    type,
    placeholder,
    register,
    error,
}: {
    label: string;
    type: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
}) {
    return (
        <div className={styles.inputGroup}>
            <label className={styles.label}>{label}:</label>
            <input
                type={type}
                className={styles.registerInput}
                placeholder={placeholder}
                {...register}
            />
            {error && <ErrorMessage error={error} />}
        </div>
    );
}

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState<string | undefined>(undefined);
    const [serverError, setServerError] = useState(false); // Controla el botón de error

    const { register, handleSubmit} = useForm<Inputs>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.password !== data.confirmPassword) {
            setErrorStatus("Las contraseñas no coinciden");
            return;
        }

        setIsLoading(true);
        setErrorStatus(undefined);
        setServerError(false);

        try {
            const options = {
                headers: { 'content-type': 'application/json' },
            };

            const res = await axios.post('http://localhost:4321/register', data, options);

            if (res.status === 200 && res.data[0]?.insertedId) {
                setErrorStatus(undefined);
                alert("Registro exitoso.");
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                setErrorStatus("No fue posible registrar el usuario.");
            }
        } catch (error) {
            setErrorStatus("Error del servidor.");
            setServerError(true); // Activa el botón en caso de error
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
                <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={styles.registerFormTitle}>Registro</h2>

                    {errorStatus && !serverError && (
                        <div className={styles.errorStatus}>{errorStatus}</div>
                    )}

                    {/* Mostrar error si hay un error de servidor */}
                    {serverError && (
                        <button
                            className={styles.serverErrorButton}
                            onClick={handleCloseServerError}
                        >
                            Error del servidor. Haz clic para cerrar.
                        </button>
                    )}

                    {/* Inputs */}
                    <InputField
                        label="Nombre"
                        type="text"
                        placeholder="Tu nombre"
                        register={register("name")}
                    />
                    <InputField
                        label="Correo"
                        type="email"
                        placeholder="Tu correo"
                        register={register("email")}
                    />
                    <InputField
                        label="Contraseña"
                        type="password"
                        placeholder="Contraseña"
                        register={register("password")}
                    />
                    <InputField
                        label="Confirmar Contraseña"
                        type="password"
                        placeholder="Confirmar contraseña"
                        register={register("confirmPassword")}
                    />

                    <div className={styles.inputGroup}>
                        <input type="submit" className={styles.registerButton} value="Registrar" />
                    </div>
                </form>
            )}
        </>
    );
}

export default Register;
