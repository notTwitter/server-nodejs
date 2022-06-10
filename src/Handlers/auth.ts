import { Request, Response, NextFunction } from "express";
import { CONSOLE_LOG_API } from "../backend.config";
import { authError } from "../errorResponses";


export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    CONSOLE_LOG_API? console.log("Checking permissions") : null
    const isLoggedIn:boolean|undefined= req.session.isLoggedIn
    if(isLoggedIn!=true){
        CONSOLE_LOG_API? console.log("Permission Denied") : null
        res.status(401).send(authError)
    }else{
        CONSOLE_LOG_API? console.log("Permission Granted") : null
        next();
    }
}