import { Response } from "express"

import { AddTransactionSchema } from "../schemas/transactionSchemas";
import { TransactionData, InsertedTransactionData, TransactionToInsert } from "../config/types";
import ValidationError from "../models/ValidationError";
import { addTransaction, getAllTransactions, deleteTransaction } from "../models/transactions.model";
import { getCategoryName } from "../models/categories.model";

async function addTransactionController(transaction: TransactionToInsert, user: number, res: Response) {
    const { success, data, error } = AddTransactionSchema.safeParse(transaction)
    if(!success) {
        throw new ValidationError(error)
    }
    const insertedTransaction = await addTransaction(data, user)
    const categoryName = await getCategoryName(insertedTransaction[0].id)
    const transactionToReturn = {...insertedTransaction, categoryName}
    res.send(transactionToReturn)
}

async function getAllTransactionsController(user_id: number, res: Response) {
    const transactions = await getAllTransactions(user_id)
    res.send(transactions)
}

async function deleteTransactionController(id: number, res: Response) {
    const deleted = await deleteTransaction(id)
    if(!deleted) {
        res.send({deletedOk: false})
    }
    res.send({deletedOk: true})
}

export { addTransactionController, getAllTransactionsController, deleteTransactionController }