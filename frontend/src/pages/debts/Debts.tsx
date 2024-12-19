import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import styles from './Debts.module.css'
import axiosClient from '../../config/axiosClient'

type Inputs = {
    contact_name: string,
    amount: number,
    date: string,
    due_date: string,
    status: string
}

type Debt = {
    amount: number,
    contact_name: string,
    date: string,
    due_date: string,
    id: number,
    status: "owed" | "receivable",
    user_id: number
}

function Debts() {
    const [debts, setDebts] = useState<Debt[]>([])
    useEffect(() => {
        if(debts.length === 0) {
            axiosClient.get('/debts')
            .then((res) => {
                setDebts(res.data)
            })
        }
    }, [])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const debt = {
            contact_name: data.contact_name,
            amount: data.amount,
            date: data.date,
            due_date: data.due_date,
            status: data.status
        }
        const options = {
            params: {'': ''},
            headers: {'content-type': 'application/json'}
        }
        axiosClient.post('/debts', debt, options)
        .then((data) => {
            setDebts([...debts, data.data[0]])
        })
    }

    return(
        <>
            <div className={styles.mainDebts}>
                <div className={styles.container}>
                    <div className={styles.introText}>
                        <h3>Gestión de Deudas</h3>
                        <p>En esta sección podrás visualizar, agregar y gestionar las deudas, ya sean pendientes por cobrar o por pagar. Mantén un control eficiente de tus finanzas con esta herramienta.</p>
                    </div>
                    <div className={styles.card}>
                        <h2>Deudas</h2>
                        <div className={styles.debtsTableInfo}>
                            <div className={styles.debtsTableWrapper}>
                                <table className={styles.debtsTable}>
                                    <thead>
                                        <tr>
                                            <th>Contacto</th>
                                            <th>Monto</th>
                                            <th>Fecha</th>
                                            <th>Vencimiento</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            debts.map((element) => {
                                                return(
                                                    <tr key={element.id}>
                                                        <td>{element.contact_name}</td>
                                                        <td>{element.amount}</td>
                                                        <td>{element.date}</td>
                                                        <td>{element.due_date}</td>
                                                        <td>{element.status}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addDebt + ' ' + styles.card}>
                        <h2>Agregar deuda</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.inputGroup}>
                                <label>Nombre de contacto</label>
                                <input type="text" {...register('contact_name', {required: true})} />
                                {errors.contact_name && <p className={styles.formError}>Debe ingresar un nombre de contacto.</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Monto</label>
                                <input type="number" {...register('amount', {required: true})} />
                                {errors.amount && <p className={styles.formError}>Debe ingresar un monto.</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Fecha</label>
                                <input type="date" {...register('date', {required: true})}/>
                                {errors.date && <p className={styles.formError}>Debe ingresar una fecha.</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Fecha de vencimiento</label>
                                <input type="date" {...register('due_date', {required: true})}/>
                                {errors.due_date && <p className={styles.formError}>Debe ingresar una fecha de vencimiento.</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Estado</label>
                                <select {...register('status')}>
                                    <option value="owed">Por pagar</option>
                                    <option value="receivable">Por cobrar</option>
                                </select>
                            </div>
                            <input type="submit" value="Enviar" className={styles.button} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Debts
