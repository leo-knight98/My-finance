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
    category: number,
    date: string,
    description: string,
    amount: number
}

export {UserData, LoginData, ExtendedRequest, RegisterData, CategoryData, TransactionData}