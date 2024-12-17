import { useForm, SubmitHandler, FieldValues, UseFormRegisterReturn } from "react-hook-form";
import styles from './Register.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../loading/Loading";
import axiosClient from "../../config/axiosClient";

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
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
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
    const [serverError, setServerError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.password !== data.confirmPassword) {
            setErrorStatus("Las contraseñas no coinciden.");
            setSuccessMessage(undefined);
            return;
        }

        setIsLoading(true);
        setErrorStatus(undefined);
        setServerError(false);
        setSuccessMessage(undefined);

        try {
            const options = { headers: { 'Content-Type': 'application/json' } };
            const res = await axiosClient.post('/register', data, options);

            if (res.status === 200 && res.data[0]?.insertedId) {
                setSuccessMessage("¡Usuario registrado exitosamente! 🎉");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                setErrorStatus("No fue posible registrar el usuario.");
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
                    <h2 className={styles.registerFormTitle}>Registro</h2>

                    {/* Mostrar error general transparente */}
                    {errorStatus && (
                        <div className={styles.errorStatus}>
                            {errorStatus}
                        </div>
                    )}

                    {/* Mostrar mensaje de éxito */}
                    {successMessage && (
                        <SuccessMessage message={successMessage} />
                    )}

                    <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label="Nombre"
                            type="text"
                            placeholder="Tu nombre"
                            register={register("name", { required: "El nombre es obligatorio" })}
                            error={errors.name?.message}
                        />
                        <InputField
                            label="Correo"
                            type="email"
                            placeholder="Tu correo"
                            register={register("email", { required: "El correo es obligatorio" })}
                            error={errors.email?.message}
                        />
                        <InputField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            register={register("password", { required: "La contraseña es obligatoria" })}
                            error={errors.password?.message}
                        />
                        <InputField
                            label="Confirmar Contraseña"
                            type="password"
                            placeholder="Confirmar contraseña"
                            register={register("confirmPassword", { required: "La confirmación es obligatoria" })}
                            error={errors.confirmPassword?.message}
                        />

                        <div className={styles.inputGroup}>
                            <button type="submit" className={styles.registerButton}>
                                Registrar
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

export default Register;
