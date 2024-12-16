import styles from './Transaction.module.css'
import { useState } from "react";


type TransactionProps = {
    title: string;
    amount: number;
    extraInformation: string
}


function Transaction(props: TransactionProps){
    return (
        <>
            <div className={styles['transaction-card']}>
                <div className={styles['transaction-card-heading']}>
                    <h3>{props.title}</h3>
                    {/* Icon */}
                   
                </div>
                <span>${props.amount}</span>
                <span>{props.extraInformation}</span>
            </div>
        </>
    )
}

export default Transaction;