import {z} from 'zod'

enum status {
    owed = "owed",
    receivable = "receivable"
}

const AddDebtSchema = z.object({
    contact_name: z.string(),
    amount: z.coerce.number(),
    date: z.string(),
    due_date: z.string(),
    status: z.nativeEnum(status)
})

export { AddDebtSchema }