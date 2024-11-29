
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"

import styles from './Register.module.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate()
    type Inputs = {
        name: string,
        email: string,
        password: string
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const options = {
            method: 'POST',
            url: 'http://localhost:4321/register',
            params: {'': ''},
            headers: {'content-type': 'application/json'},
            data: data,
        };
        axios.request(options)
            .then((res) => {
                if(res.data[0].insertedId) {
                    alert('Registro completado')
                    setTimeout(() => {
                        navigate("/")
                    }, 3000)
                }
            })
    }
    return(
        <>
            <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label>Username:</label>
                    <input type='text' className={styles.registerInput} placeholder="name" {...register('name', {required: true})} />
                    {errors.name && <p className={styles.formError}>You must enter a username.</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label>Email:</label>
                    <input type='email' className={styles.registerInput} placeholder='email' {...register('email', {required: true})} />
                    {errors.email && <p className={styles.formError}>You must enter an email.</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label>Password:</label>
                    <input type='password' className={styles.registerInput} placeholder="password" {...register('password', {required: true})} />
                    {errors.email && <p className={styles.formError}>You must enter a password</p>}
                </div>
                <div className={styles.inputGroup}></div>
                <div className={styles.inputGroup}>
                    <input type="submit" value="submit" className={styles.registerButton} />
                </div>
                
            </form>
        </>
    )
}

export default Register