import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import styles from "./Categories.module.css";  
import { CiTrash } from 'react-icons/ci';
import useCategoryContext from '../../hooks/CategoryContext';

function Categories() {
    const categoryContext = useCategoryContext();
    type Inputs = {
        name: string,
        type: string
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    }  = useForm<Inputs>();
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const category = {
            name: data.name,
            type: data.type
        };
        categoryContext.addCategory(category);
    };

    function handleDelete(id: number) {
        categoryContext.deleteCategory(id);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.introText}>
                    <h1>Gestión de Categorías</h1>
                    <p>
                        En esta sección puedes gestionar las categorías de tus transacciones. 
                        Agrega nuevas categorías para tus ingresos, gastos o deudas y elimina aquellas que ya no necesites. 
                        ¡Mantén tu sistema organizado y fácil de usar!
                    </p>
                </div>
                <div className={styles.card}>
                    <h2>Categorías</h2>
                    <table className={styles.categoriesTable}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tipo</th>
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
                                            <td><button onClick={() => { handleDelete(element.id); }}><CiTrash /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className={styles.addCategory + ' ' + styles.card}>
                    <h2>Agregar categoría</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.inputGroup}>
                            <label>Nombre</label>
                            <input type="text" placeholder='Ingresar nombre' {...register('name', { required: true })} />
                            {errors.name && <p className={styles.formError}>Debes ingresar un nombre.</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Tipo</label>
                            <select {...register('type', { required: true })}>
                                <option value="income">Ingreso</option>
                                <option value="expense">Gasto</option>
                                <option value="debt">Deuda</option>
                            </select>
                        </div>
                        <input type="submit" value="Enviar" className={styles.button} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Categories;
