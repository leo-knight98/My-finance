import {z} from 'zod'

const AddTransactionSchema = z.object({
    type: z.string(),
    category: z.coerce.number(),
    date: z.string(),
    description: z.string(),
    amount: z.coerce.number()
})

export { AddTransactionSchema }