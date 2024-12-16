import FormDialog from '../../components/formDialog/FormDialog'
import styles from './Goals.module.css'
import Goal from '../../components/goal/Goal'
import UseGoalContext from '../../hooks/GoalContext'

type Goal = {
    id: number,
    user_id: number,
    current_amount: number,
    due_date: string,
    name: string,
    target_amount: number,
}

type GoalAdded = {
    current: number,
    due_date: string,
    title: string,
    total: number
}

function Goals() {
    const context = UseGoalContext()
    function addGoal(goal: GoalAdded) {
        context.addGoal(goal)
    }

    return(
        <>
            <div className={styles.mainContainer}>
                <FormDialog addGoal={addGoal} />
                <div className={styles.goalContainer}>
                    {
                        context.goals.map((element) => {
                            return(
                                <Goal key={element.id} id={element.id} title={element.name} dueDate={element.due_date} currentAmount={Number(element.current_amount)} total={Number(element.target_amount)} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Goals