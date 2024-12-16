import { DebtData } from "../config/types";
import db from "../db";
import { debts } from "../db/schema";
import { eq } from "drizzle-orm";

async function AddDebt(debtData: DebtData, user: number) {
    const dataToInsert = {...debtData, user_id: user}
    const insert = await db.insert(debts).values(dataToInsert).returning()
    return insert
}

async function GetAllDebts(user: number) {
    const debtsFromUser = db.select().from(debts).where(eq(debts.user_id, user))
    return debtsFromUser
}

export { AddDebt, GetAllDebts }