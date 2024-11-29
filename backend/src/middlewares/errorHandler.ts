import HttpError from "../models/HttpError"
import { Request, Response } from "express"

function errorHandler(error: Error | HttpError, req: Request, res: Response, next) {
    if(error instanceof HttpError) {
        res.status(error.statusCode).send({
            message: error.message
        })
        return
    }
    res.status(500).send({message: error.message})
}