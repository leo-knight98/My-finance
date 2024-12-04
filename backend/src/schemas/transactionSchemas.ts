import {z} from 'zod'

const AddTransactionSchema = z.object({
    type: z.enum(['income', 'expense', 'debt']),
    category: z.coerce.number(),
    date: z.string(),
    description: z.string(),
    amount: z.coerce.number()
})

export { AddTransactionSchema }