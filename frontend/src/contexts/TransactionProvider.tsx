import axios from "axios"
import { createContext, ReactNode, useState } from "react"

type TransactionType = {
    amount: number
    category_name: string
    date: string
    description: string
    id: number
    type: string
    user_id: number
}

type TransactionData = {
    type: string,
    category: string,
    date: Date,
    description: string,
    amount: number
}

type TransactionContext = {
    transactions: TransactionType[],
    getAllTransactions: () => void,
    addTransaction: (transaction: TransactionData) => void,
    deleteTransaction: (id: number) => void
}

type TransactionProviderProps = {
    children: ReactNode
}

const TransactionContext = createContext<TransactionContext | null>(null)
function TransactionProvider({children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<TransactionType[]>([])
    function getAllTransactions() {
        axios.get('http://localhost:4321/transactions', {
            withCredentials: true
        })
        .then((data) => {
            setTransactions(data.data)
        })
    }
    function addTransaction(transaction: TransactionData) {
        axios.post('http://localhost:4321/transactions', transaction, {
            withCredentials: true,
            params: {'': ''},
            headers: {'content-type': 'application/json'},
        })
        .then((data) => {
            const transactionsList = [...transactions, data.data[0]]
            setTransactions(transactionsList)
        })
    }
    function deleteTransaction(id: number) {
        axios.get(`http://localhost:4321/transactions/delete?id=${id}`, {withCredentials: true})
        .then((res) => {
            if(res.data.deletedOk) {
                const newTransactions = transactions.filter(element => element.id !== id)
                setTransactions(newTransactions)
            }
        })
    }

    const valueToSend = {
        transactions: transactions,
        getAllTransactions,
        addTransaction,
        deleteTransaction
    }
    return (
        <TransactionContext.Provider value={valueToSend}>
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider
export { TransactionContext }