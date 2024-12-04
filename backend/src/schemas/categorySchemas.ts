import { z } from 'zod'

const AddCategorySchema = z.object({
    user_id: z.coerce.number(),
    name: z.string(),
    type: z.enum(['income', 'expense', 'debt'])
})
export { AddCategorySchema }