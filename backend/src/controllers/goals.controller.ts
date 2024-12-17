import { Response } from "express";
import { AddGoalSchema, EditGoalSchema } from "../schemas/goalSchemas";
import { GoalData, GoalEditData } from "../config/types";
import { AddGoal, GetAllGoals, deleteGoal, editGoal, getTotalSaved } from "../models/goals.model";
import ValidationError from "../models/ValidationError";

async function addGoalController(goal: GoalData, user_id: number, res: Response) {
    const { success, data, error } = AddGoalSchema.safeParse(goal)
    if(!success) {
        throw new ValidationError(error)
    }
    const insert = await AddGoal(data, user_id)
    res.send(insert)
}

async function getAllGoalsController(user: number, res: Response) {
    const goals = await GetAllGoals(user)
    res.send(goals)
}

async function deleteGoalController(id: number, res: Response) {
    const deleted = await deleteGoal(id)
    if(!deleted) {
        res.send({deletedOk: false})
    }
    res.send({deletedOk: true})
}

async function editGoalController(goal: GoalEditData, user_id: number, res: Response) {
    const { success, data, error } = EditGoalSchema.safeParse(goal)
    if(!success) {
        throw new ValidationError(error)
    }
    const edited = await editGoal(data, user_id)
    console.log(edited)
    res.send(edited)
}

async function getTotalSavedController(user: number, res: Response) {
    const total = getTotalSaved(user)
    res.send(total)
}

export { addGoalController, getAllGoalsController, deleteGoalController, editGoalController, getTotalSavedController }