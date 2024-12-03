import express, { NextFunction, Request, Response } from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import HttpError from './models/HttpError'
import { loginController, registerController } from './controllers/users.controllers'
import { addCategoryController, getAllCategoriesController, deleteCategoryController } from './controllers/categories.controllers.ts'
import ValidationError from './models/ValidationError'
import LoginError from './models/LoginError'
import userAuth from './middlewares/userAuth'
import {ExtendedRequest} from "./config/types.ts";
import { addTransactionController } from './controllers/transactions.controllers.ts'


const app = express()
dotenv.config()
const PORT = process.env.PORT ?? 4000
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieparser())
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})


app.get("/", (req, res) => {
    console.log("Get")
    res.send()
})



app.get("/dashboard", userAuth, (req: ExtendedRequest, res) => {
    res.send(req.user)
})

app.post("/login", (req, res) => {
    const user = req.body
    loginController(user, res)
})

app.post("/register", (req, res) => {
    const user = req.body
    registerController(user, res)
})

app.post("/transactions", userAuth, (req: ExtendedRequest, res) => {
    addTransactionController(req.body, req.user!.userId, res)
})

app.get("/categories", userAuth, (req: ExtendedRequest, res) => {
    getAllCategoriesController(req.user!.userId, res)
})

app.post("/categories", userAuth, (req: ExtendedRequest, res) => {
    const category = {
        user_id: req.user!.userId,
        name: req.body.name,
        type: req.body.type
    }
    addCategoryController(category, res)
})

app.get("/categories/delete", userAuth, (req: ExtendedRequest, res) => {
    const id = Number(req.query.id)
    deleteCategoryController(req.user!.userId, id, res)
})

app.use((req, res) => {
    throw new HttpError(404, "Pagina no encontrada")
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof HttpError) {
        res.status(error.statusCode).send({
            message: error.message
        })
        return
    }
    if(error instanceof ValidationError || error instanceof LoginError) {
        res.send({message: error.message})
        return
    }
    if(error instanceof Error) {res.status(500).send({message: error.message}); return}
})