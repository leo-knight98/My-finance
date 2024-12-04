import { Request } from "express";

enum type {
    income = 'income',
    expense = 'expense',
    debt = 'debt'
}

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
    type: type
}

type TransactionData = {
    type: type,
    category: number,
    date: string,
    description: string,
    amount: number
}

export {UserData, LoginData, ExtendedRequest, RegisterData, CategoryData, TransactionData}