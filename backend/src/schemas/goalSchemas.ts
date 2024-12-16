import {z} from 'zod'

const AddGoalSchema = z.object({
    title: z.string(),
    current: z.number(),
    total: z.number(),
    due_date: z.string()
})
const EditGoalSchema = z.object({
    id: z.coerce.number(),
    title: z.string(),
    current: z.number(),
    total: z.number(),
    due_date: z.string()
})

export { AddGoalSchema, EditGoalSchema }