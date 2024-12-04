import { CategoryData } from "../config/types";
import { eq, and } from "drizzle-orm";
import db from "../db";
import { categories } from "../db/schema";

async function addCategory(category: CategoryData) {
    const insert = await db.insert(categories).values({
        user_id: category.user_id as any,
        name: category.name,
        type: category.type as any
    }).returning()
    return insert
}

async function getAllCategories(user_id: number) {
    const categoriesData = await db.select().from(categories).where(
        eq(categories.user_id, user_id)
    )
    return categoriesData
}

async function deleteCategory(id: number, user_id: number) {
    const deleted_id = await db.delete(categories).where(and(
        eq(categories.id, id),
        eq(categories.user_id, user_id)
    ))
    return deleted_id
}

export { addCategory, getAllCategories, deleteCategory }