import { Response } from "express"

import { AddTransactionSchema } from "../schemas/transactionSchemas";
import { TransactionData } from "../config/types";
import ValidationError from "../models/ValidationError";
import { addTransaction } from "../models/transactions.model";

async function addTransactionController(transaction: TransactionData, user: number, res: Response) {
    const { success, data, error } = AddTransactionSchema.safeParse(transaction)
    if(!success) {
        throw new ValidationError(error)
    }
    const insertedTransaction = await addTransaction(data, user)
    res.send(insertedTransaction)
}

export { addTransactionController }