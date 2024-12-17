import { useEffect, useState } from "react";
import useCategoryContext from "../../hooks/CategoryContext";
import useTransactionContext from "../../hooks/TransactionContext";
import Balance from "../../components/balance/Balance";
import styles from './Dashboard.module.css'
import UseGoalContext from "../../hooks/GoalContext";
import Goals from "../goals/Goals";

type numbers = {
    totalBalance: number,
    totalIncome: number,
    totalExpense: number,
    totalSavings: number
}

function Dashboard() {
    const categoryContext = useCategoryContext()
    const transactionContext = useTransactionContext()
    const goalContext = UseGoalContext()
    const [numbers, setNumbers] = useState<numbers>({
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        totalSavings: 0
    })

    useEffect(() => {
        if (categoryContext.categories.length === 0) {
            categoryContext.getAllCategories()
        }
        if (transactionContext.transactions.length === 0) {
            transactionContext.getAllTransactions()
        }
        if (goalContext.goals.length === 0) {
            goalContext.getAllGoals()
        }
        goalContext.getTotalSaved()
    }, [])

    useEffect(() => {
        transactionContext.transactions.forEach((element) => {
            if(element.type === 'expense') {                
                setNumbers((prev) => ({
                        ...prev,
                        totalExpense: prev.totalExpense + element.amount,
                        totalBalance: prev.totalBalance - element.amount
                }))
            } else if(element.type === 'income') {
                setNumbers((prev) => ({
                    ...prev,
                    totalIncome: prev.totalIncome + element.amount,
                    totalBalance: prev.totalBalance + element.amount
                }))
            }
        })
        setNumbers((prev) => ({...prev, totalSavings: goalContext.totalSaved}))
    }, [transactionContext.transactions])
    
    return (
        <>
            <Balance />
            <div className={styles.titleText}>
                <h3>Resumen de tus datos financieros</h3>
                <p>Aquí tienes un resumen de tu saldo total, ingresos, gastos y ahorros.</p>
            </div>
            <section className={styles.transactionCardWrapper}>
                <div className={styles.card}>
                    <h3>Saldo Total</h3>
                    <p className={styles.amount}>{numbers.totalBalance}</p>
                    <p className={styles.extraInfo}>Información adicional</p>
                </div>
                <div className={styles.card}>
                    <h3>Ingresos</h3>
                    <p className={styles.amount}>{numbers.totalIncome}</p>
                    <p className={styles.extraInfo}>Información adicional</p>
                </div>
                <div className={styles.card}>
                    <h3>Gastos</h3>
                    <p className={styles.amount}>{numbers.totalExpense}</p>
                    <p className={styles.extraInfo}>Información adicional</p>
                </div>
                <div className={styles.card}>
                    <h3>Ahorros Totales</h3>
                    <p className={styles.amount}>{numbers.totalSavings}</p>
                    <p className={styles.extraInfo}>Información adicional</p>
                </div>
            </section>
        </>
    )
}
export default Dashboard