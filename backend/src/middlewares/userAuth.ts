import { Response, NextFunction } from "express";
import HttpError from "../models/HttpError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import {ExtendedRequest, UserData} from "../config/types.ts";

function userAuth(req: ExtendedRequest, res: Response, next: NextFunction) {
    const token = req.cookies.access_token
    if(!token) {
        throw new HttpError(401, "You must send an access token")
    }
    let payload
    try {
        payload = jwt.verify(token, process.env.TOKEN_KEY!) as UserData
    } catch(error) {
        throw new HttpError(401, "Invalid or expired token")
    }
    req.user = payload
    next()
}
export default userAuth