import {useForm, FieldValues, SubmitHandler} from 'react-hook-form'

import useCategoryContext from '../../hooks/CategoryContext'
import styles from './Transaction.module.css'
import axios from 'axios'


function Transactions() {
    const categoryContext = useCategoryContext()
    const [transactions, setTransactions] = useState([])
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
        formState: {errors}
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const transaction = {
            type: data.type,
            category: data.category,
            date: data.date,
            description: data.description,
            amount: data.amount
        }
        axios.post('http://localhost:4321/transactions', transaction, {
            withCredentials: true,
            params: {'': ''},
            headers: {'content-type': 'application/json'},
        })
    }

    return(
        <>
            <div className={styles.formCard}>
                <h1>Add transaction</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputGroup}>
                        <label>Type</label>
                        <select {...register('type', {required: true})}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                            <option value="debt">Debt</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Category</label>
                        <select {...register('category', {required: true})}>
                            {
                                categoryContext.categories.map((element) => {
                                    return(
                                        <option value={element.id}>{element.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Date</label>
                        <input type='date' {...register('date', {required: true})} />
                        {errors.date && <p className={styles.formError}>You must enter a date.</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Description</label>
                        <input type="text" {...register('description', {required: true})} />
                        {errors.description && <p className={styles.formError}>You must enter a description.</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Amount</label>
                        <input type="number" {...register('amount', {required: true})} />
                        {errors.amount && <p className={styles.formError}>You must enter an amount.</p>}
                    </div>
                    <div className={styles.inputGroup}></div>
                    <input type="submit" value="Submit" className={styles.button} />
                </form>
            </div>
        </>
    )
}
export default Transactions