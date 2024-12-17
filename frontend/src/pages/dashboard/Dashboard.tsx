import { useEffect, useState } from "react";
import useCategoryContext from "../../hooks/CategoryContext";
import useTransactionContext from "../../hooks/TransactionContext";
import Balance from "../../components/balance/Balance";
import Transaction from "../../components/Transaction/Transaction";
import styles from './Dashboard.module.css'
import UseGoalContext from "../../hooks/GoalContext";

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
            } else if(element.type === "debt") {
                setNumbers((prev) => ({
                    ...prev,
                    totalSavings: prev.totalBalance - element.amount
                }))
            }
        })
    }, [transactionContext.transactions])
    
    return (
        <>
            <Balance />
            <section className={styles['transaction-card-wrapper']}>
                <Transaction title="Total Balance" amount={numbers.totalBalance} extraInformation="Additional information"/>
                <Transaction title="Income" amount={numbers.totalIncome} extraInformation="Additional information"/>
                <Transaction title="Expense" amount={numbers.totalExpense} extraInformation="Additional information"/>
                <Transaction title="Total savings" amount={numbers.totalSavings} extraInformation="Additional information"/>
            </section>
        </>
    )
}
export default Dashboard