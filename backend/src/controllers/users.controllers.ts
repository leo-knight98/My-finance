import { Request, RequestHandler, Response } from 'express';
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { LoginSchema, AddUserSchema } from "../schemas/userSchemas"
import ValidationError from '../models/ValidationError';
import { login, registerUser } from '../models/UserModel';
import UserData from '../config/types/UserData';
import LoginError from '../models/LoginError';
import RegisterData from '../config/types/RegisterData';

dotenv.config()

async function loginController(userData: UserData, res: Response) {
    const token_key = process.env.TOKEN_KEY
    const { success, data: user, error } = LoginSchema.safeParse(userData)
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
                const token = jwt.sign({userId: userReceived.id}, token_key!)
                res.send({
                    loginOk: true,
                    token: token
                })
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