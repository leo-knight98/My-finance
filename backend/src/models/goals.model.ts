import { GoalData, GoalEditData } from "../config/types";
import db from "../db";
import { goals } from "../db/schema";
import { and, eq, sql, sum } from 'drizzle-orm'

async function AddGoal(goal: GoalData, user: number) {
    const insert = await db.insert(goals).values({
        user_id: user,
        name: goal.title,
        current_amount: goal.current,
        target_amount: goal.total,
        due_date: goal.due_date
    }).returning()
    return insert
}

async function GetAllGoals(user: number) {
    const goalsArray = await db.select().from(goals).where(eq(goals.user_id, user))
    return goalsArray
}

async function deleteGoal(id: number) {
    const deletedId = await db.delete(goals).where(eq(goals.id, id))
    return deletedId
}

async function editGoal(goal: GoalEditData, user: number) {
    const updated = await db.update(goals).set({
        name: goal.title,
        current_amount: goal.current,
        target_amount: goal.total,
        due_date: goal.due_date
    }).where(
        eq(goals.id, goal.id)
    ).returning()
    return updated
}

async function getTotalSaved(user: number) {
    const total = await db.select({
        sum: sql<number>`cast(sum(${goals.current_amount}) as int`,
    }).from(goals).where(
        eq(goals.user_id, user)
    )
    return total
}

export { AddGoal, GetAllGoals, deleteGoal, editGoal, getTotalSaved }