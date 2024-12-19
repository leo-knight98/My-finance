import styles from './Goal.module.css'
import ProgressBar from '../progressBar/ProgressBar'
import { FaRegTrashCan } from 'react-icons/fa6'
import FormDialogEdit from '../formDialogEdit/FormDialogEdit'
import UseGoalContext from '../../hooks/GoalContext'

type GoalProps = {
    id: number,
    title: string,
    dueDate: string,
    currentAmount: number,
    total: number,
}

function Goal(props: GoalProps) {
    const context = UseGoalContext()

    function deleteGoalChild(id: number) {
        context.deleteGoal(id)
    }

    const progressNumber = Math.round((props.currentAmount / props.total) * 100)

    return(
        <div className={styles.goalCard}>
            <div className={styles.goalCardHeading}>
                <h3>{props.title}</h3>
            </div>
            <p className={styles.dueDate}>Vencimiento — {props.dueDate}</p>
            
            <div className={styles.goalCardBody}>
                <div className={styles.amountWrapper}>
                    <span className={styles.current}> {props.currentAmount}</span> / <span className={styles.total}>{props.total}</span>
                </div>
                
                {/* rra de progreso */}
                <ProgressBar progress={progressNumber} />
                
                {/* Mostrar porcentaje debajo de la barra de progreso */}
                <div className={styles.progressPercentage}>
                    {progressNumber}% Completado
                </div>
            </div>

            <div className={styles.buttonsWrapper}>
                <FormDialogEdit 
                    id={props.id} 
                    title={props.title} 
                    total={props.total} 
                    current={props.currentAmount} 
                    due_date={props.dueDate} 
                />
                <button 
                    className={`${styles.goalsAction} ${styles.deleteAction}`} 
                    onClick={() => deleteGoalChild(props.id)}
                >
                    <FaRegTrashCan className={styles.deleteIcon} />
                </button>
            </div>
        </div>
    )
}

export default Goal
