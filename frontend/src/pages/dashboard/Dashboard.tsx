import { useEffect } from "react";
import useCategoryContext from "../../hooks/CategoryContext";
import Balance from "../../components/balance/Balance";
import Transaction from "../../components/Transaction/Transaction";
import styles from './Dashboard.module.css'
function Dashboard() {
    const categoryContext = useCategoryContext()
    useEffect(() => {
        fetch('http://localhost:4321/dashboard', {
            credentials: 'include'
        })
        .then((res) => res.json())
        categoryContext.getAllCategories()
    })

    return (
        <>
            <Balance />
            <section className={styles['transaction-card-wrapper']}>
            <Transaction title="Total Balance" amount={15.700} extraInformation="Additional information"/>
            <Transaction title="Income" amount={15.700} extraInformation="Additional information"/>
            <Transaction title="Expense" amount={15.700} extraInformation="Additional information"/>
            <Transaction title="Total savings" amount={15.700} extraInformation="Additional information"/>
        </section>
        </>
    )
}
export default Dashboard