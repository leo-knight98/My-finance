import { DebtData } from "../config/types";
import { Response } from "express";
import { AddDebtSchema } from "../schemas/debtSchemas";
import { AddDebt, GetAllDebts } from "../models/debts.model";
import ValidationError from "../models/ValidationError";

async function addDebtController(debtData: DebtData, userId: number, res: Response) {
    const {success, data, error} = AddDebtSchema.safeParse(debtData)
    if(!success) {
        throw new ValidationError(error)
    }
    const insertedDebt = await AddDebt(data, userId)
    res.send(insertedDebt)
}

async function getAllDebtsController(user: number, res: Response) {
    const debts = await GetAllDebts(user)
    res.send(debts)
}

export { addDebtController, getAllDebtsController }