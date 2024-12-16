import { Request } from "express";

type LoginData = {
    username: string,
    password: string
}

type UserData = {
    userId: number,
    username: string
}

type ExtendedRequest = Request & {
    user?: UserData;
};

type RegisterData = {
    name: string,
    email: string,
    password: string
}

type CategoryData = {
    user_id: number,
    name: string,
    type: string
}

type TransactionData = {
    type: string,
    category: string,
    date: string,
    description: string,
    amount: number
}
type TransactionToInsert = {
    type: "income" | "expense" | "debt",
    category: number,
    date: string,
    description: string,
    amount: number
}
type InsertedTransactionData = {
    date: string | null,
    id: number,
    user_id: number | null,
    type: "income" | "expense" | "debt" | null,
    category_id: number | null,
    description: string | null,
    amount: number
}
type DebtData = {
    contact_name: string,
    amount: number,
    date: string,
    due_date: string,
    status: 'owed' | 'receivable'
}

type GoalData = {
    current: number,
    due_date: string,
    title: string,
    total: number
}
type GoalEditData = {
    id: number,
    current: number,
    due_date: string,
    title: string,
    total: number
}

type Goal = {
    id: number,
    user_id: number,
    current: number,
    due_date: string,
    title: string,
    total: number,
}

export {UserData, LoginData, ExtendedRequest, RegisterData, CategoryData, TransactionData, InsertedTransactionData, TransactionToInsert, DebtData, GoalData, Goal, GoalEditData}