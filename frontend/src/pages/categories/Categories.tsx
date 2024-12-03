import {useForm, FieldValues, SubmitHandler} from 'react-hook-form'

import styles from "./Categories.module.css";
import { CiTrash } from 'react-icons/ci';
import useCategoryContext from '../../hooks/CategoryContext';


function Categories() {
    const categoryContext = useCategoryContext()
    type Inputs = {
        name: string,
        type: string
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    }  = useForm<Inputs>()
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const category = {
            name: data.name,
            type: data.type
        }
        categoryContext.addCategory(category)
    }

    function handleDelete(id: number) {
        categoryContext.deleteCategory(id)
    }
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1>Categories</h1>
                    <table className={styles.categoriesTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categoryContext.categories.map((element) => {
                                    return(
                                        <tr key={element.id}>
                                            <td>{element.name}</td>
                                            <td>{element.type}</td>
                                            <td><button onClick={() => {handleDelete(element.id)}}><CiTrash /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className={styles.addCategory + ' ' + styles.card}>
                    <h2>Add category</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.inputGroup}>
                            <label>Name</label>
                            <input type="text" {...register('name', {required: true})} />
                            {errors.name && <p className={styles.formError}>You must enter a name.</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Type</label>
                            <select {...register('type', {required: true})}>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                                <option value="debt">Debt</option>
                            </select>
                        </div>
                        <input type="submit" value="Submit" className={styles.button} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Categories