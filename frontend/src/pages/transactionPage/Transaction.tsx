import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import useCategoryContext from '../../hooks/CategoryContext'
import useTransactionContext from '../../hooks/TransactionContext'
import styles from './Transaction.module.css'
import { CiTrash } from 'react-icons/ci'

function Transactions() {
    const categoryContext = useCategoryContext()
    const context = useTransactionContext()

    type Inputs = {
        type: string,
        category: string,
        date: Date,
        description: string,
        amount: number
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const transaction = {
            type: data.type,
            category: data.category,
            date: data.date,
            description: data.description,
            amount: data.amount
        }
        context.addTransaction(transaction)
    }

    function deleteTransaction(id: number) {
        context.deleteTransaction(id)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.introText}>
                    <h1>Transacciones</h1>
                    <p>
                        Aquí puedes ver todas tus transacciones, tanto ingresos como gastos o deudas. También puedes añadir nuevas transacciones mediante el formulario abajo.
                    </p>
                </div>
                <div className={styles.card}>
                    <table className={styles.transactionsTable}>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Categoría</th>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Importe</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                context.transactions.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td>{element.type}</td>
                                            <td>{element.category_name}</td>
                                            <td>{element.date}</td>
                                            <td>{element.description}</td>
                                            <td>{element.amount}</td>
                                            <td><button onClick={() => { deleteTransaction(element.id) }}><CiTrash /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className={styles.formCard}>
                    <h2>Añadir transacción</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="type">Tipo</label>
                            <select {...register('type', { required: true })} id="type">
                                <option value="income">Ingreso</option>
                                <option value="expense">Gasto</option>
                                <option value="debt">Deuda</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="category">Categoría</label>
                            <select {...register('category', { required: true })} id="category">
                                {
                                    categoryContext.categories.map((element) => {
                                        return (
                                            <option value={element.id} key={element.id}>{element.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="date">Fecha</label>
                            <input type='date' {...register('date', { required: true })} id="date" />
                            {errors.date && <p className={styles.formError}>Debes ingresar una fecha.</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="description">Descripción</label>
                            <input type="text" {...register('description', { required: true })} id="description" />
                            {errors.description && <p className={styles.formError}>Debes ingresar una descripción.</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="amount">Importe</label>
                            <input type="number" {...register('amount', { required: true })} id="amount" />
                            {errors.amount && <p className={styles.formError}>Debes ingresar un importe.</p>}
                        </div>
                        <input type="submit" value="Enviar" className={styles.button} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Transactions
