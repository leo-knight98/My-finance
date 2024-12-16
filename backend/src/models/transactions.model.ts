import { TransactionData, TransactionToInsert } from "../config/types";
import { transactions, categories } from "../db/schema";
import { eq } from "drizzle-orm";
import db from "../db";

async function addTransaction(transaction: TransactionToInsert, user_id: number) {
    const dataToInsert = {...transaction, user_id}
    const inserted = await db.insert(transactions).values({
        user_id: dataToInsert.user_id,
        date: dataToInsert.date,
        category_id: dataToInsert.category,
        type: dataToInsert.type as any,
        amount: dataToInsert.amount,
        description: dataToInsert.description
    }).returning()
    return inserted
}

async function getAllTransactions(user: number) {
    const transactionArray = await db.select({
        id: transactions.id,
        user_id: transactions.user_id,
        date: transactions.date,
        category_name: categories.name,
        type: transactions.type,
        amount: transactions.amount,
        description: transactions.description
    }).from(transactions).where(
        eq(transactions.user_id, user)
    ).leftJoin(categories, eq(transactions.category_id, categories.id))
    return transactionArray
}

async function deleteTransaction(id: number) {
    const deleted_id = await db.delete(transactions).where(eq(transactions.id, id))
    return deleted_id
}

export { addTransaction, getAllTransactions, deleteTransaction }