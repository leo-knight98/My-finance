import { TransactionData } from "../config/types";
import { transactions } from "../db/schema";
import db from "../db";

async function addTransaction(transaction: TransactionData, user_id: number) {
    const dataToInsert = {...transaction, user_id}
    const inserted = await db.insert(transactions).values({
        user_id: dataToInsert.user_id,
        date: dataToInsert.date,
        category_id: dataToInsert.category,
        type: dataToInsert.type as any,
        amount: dataToInsert.amount,
        description: dataToInsert.description
    }).returning()
    console.log(inserted)
}

export { addTransaction }