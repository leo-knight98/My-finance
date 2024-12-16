import { z } from 'zod'

enum type {
    income = "income",
    expense = "expense",
    debt = "debt"
}

const AddCategorySchema = z.object({
    user_id: z.coerce.number(),
    name: z.string(),
    type: z.nativeEnum(type)
})
export { AddCategorySchema }