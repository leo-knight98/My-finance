import {z} from 'zod'

enum type {
    income = 'income',
    expense = 'expense',
    debt = 'debt'
}

const AddTransactionSchema = z.object({
    type: z.nativeEnum(type),
    category: z.coerce.number(),
    date: z.string(),
    description: z.string(),
    amount: z.coerce.number()
})

export { AddTransactionSchema }