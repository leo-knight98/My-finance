import { Request, RequestHandler, Response } from 'express';
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { LoginSchema, AddUserSchema } from "../schemas/userSchemas"
import ValidationError from '../models/ValidationError';
import { login, registerUser } from '../models/UserModel';
import {LoginData, RegisterData} from '../config/types.ts';
import LoginError from '../models/LoginError';

dotenv.config()

async function loginController(LoginData: LoginData, res: Response) {
    const token_key = process.env.TOKEN_KEY
    const { success, data: user, error } = LoginSchema.safeParse(LoginData)
    if(!success) {
        throw new ValidationError(error)
    }
    const userReceived = await login(user)
    if(!userReceived) {
        res.send({
            loginOk: false
        })
    } else {
        bcript.compare(user.password, userReceived.password, (err, result) => {
            if(!result) {
                res.send({loginOk: false})
            } else {
                const user = {
                    username: userReceived.username,
                    userId: userReceived.id
                }
                const token = jwt.sign(user, token_key!, {
                    expiresIn: "1d"
                })
                res.cookie("access_token", token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 1000,
                    sameSite: "none",
                    secure: true
                })
                const userToSend = {...user, loginOk: true}
                res.send(userToSend)
            }
        })
    }
}

async function registerController(user: RegisterData, res: Response) {
    const {success, data, error} = AddUserSchema.safeParse(user)
        if(!success) {
        throw new ValidationError(error)
    }
    bcript.hash(user.password, 10, async function(err, hash) {
        if(!err) {
            const insert = await registerUser({
                    name: user.name,
                    email: user.email,
                    password: hash
                })
            res.send(insert)
        }
        
    });
    // const insert = await registerUser({
    //     name: user.name,
    //     email: user.email,
    //     password: hashedPw
    // })
}
export { loginController, registerController }