import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import HttpError from './models/HttpError'
import transactionsRouter from './routes/transactions.routes'
import { loginController, registerController } from './controllers/users.controllers'
import ValidationError from './models/ValidationError'
import LoginError from './models/LoginError'
const app = express()
dotenv.config()
const PORT = process.env.PORT ?? 4321
app.use(cors())
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})


app.get("/", (req, res) => {
    console.log("Get")
    res.send()
})

//Enviar todas las peticiones /transactions al enrutador
app.use("/transactions", transactionsRouter)

app.get("/dashboard", (req, res) => {
    res.send(['info'])
})

app.post("/login", (req, res) => {
    const user = req.body
    loginController(user, res)
})

app.post("/register", (req, res) => {
    const user = req.body
    registerController(user, res)
})

/*app.get("/users/:id", (req, res) => {

})*/

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