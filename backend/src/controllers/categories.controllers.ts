import { Response } from "express"

import { CategoryData } from "../config/types"
import { AddCategorySchema } from "../schemas/categorySchemas"
import ValidationError from "../models/ValidationError"
import { addCategory, getAllCategories, deleteCategory } from "../models/categories.model"

async function addCategoryController(category: CategoryData, res: Response) {
    const { success, data: categoryData, error } = AddCategorySchema.safeParse(category)
    if(!success) {
        throw new ValidationError(error)
    }
    const categoryInserted = await addCategory(categoryData)
    res.send(categoryInserted)
}

async function getAllCategoriesController(userId: number, res: Response) {
    const categories = await getAllCategories(userId)
    res.send(categories)
}

async function deleteCategoryController(userId: number, id: number, res: Response) {
    const deletedId = await deleteCategory(id, userId)
    if(!deletedId) {
        res.send({deletedOk: false})
    }
    res.send({deletedOk: true})
}

export {addCategoryController, getAllCategoriesController, deleteCategoryController}