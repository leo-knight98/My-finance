import { TransactionData } from "../config/types";
import { transactions } from "../db/schema";
import db from "../db";

async function addTransaction(transaction: TransactionData, user_id: number) {
    const dataToInsert = {...transaction, user_id}
    const inserted = await db.insert(transactions).values({
        user_id: dataToInsert.user_id as any,
        date: dataToInsert.date as any,
        category_id: dataToInsert.category as any,
        type: dataToInsert.type as any,
        amount: dataToInsert.amount as any,
        description: dataToInsert.description as any
    }).returning()
    console.log(inserted)
}

export { addTransaction }