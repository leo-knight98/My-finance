import { TransactionData } from "../config/types";
import { transactions } from "../db/schema";
import db from "../db";

async function addTransaction(transaction: TransactionData, user_id: number) {
    const dataToInsert = {...transaction, user_id}
    const inserted = await db.insert(transactions).values(dataToInsert).returning()
    console.log(inserted)
}

export { addTransaction }