import { z } from 'zod'

const IdSchema = z.coerce.number()
const AddUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})
const LoginSchema = z.object({
    username: z.string(),
    password: z.string()
})

export { IdSchema, LoginSchema, AddUserSchema }