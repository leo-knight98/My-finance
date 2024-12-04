import {z} from 'zod'

enum transactionType {
    income = 'income',
    expense = 'expense',
    debt = 'debt'
}

const AddTransactionSchema = z.object({
    type: z.nativeEnum(transactionType),
    category: z.coerce.number(),
    date: z.string(),
    description: z.string(),
    amount: z.coerce.number()
})

export { AddTransactionSchema }