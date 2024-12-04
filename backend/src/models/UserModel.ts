import db from "../db";
import { and, eq } from "drizzle-orm";
import {LoginData, RegisterData} from '../config/types'
import { users } from "../db/schema";

async function login(userData: LoginData) {
    const [user] = await db.select({
        id: users.id,
        username: users.name,
        password: users.password
    }).from(users).where(and(
        eq(users.name, userData.username),
    ))
    return user
}

async function registerUser(userData: RegisterData) {
    const insert = await db.insert(users).values(userData).returning({ insertedId: users.id });
    return insert
}
export { login, registerUser }