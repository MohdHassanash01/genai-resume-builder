
import jwt from "jsonwebtoken"
import { env } from "../config/env.js"
import { tokenBlackListModel } from "../models/blackList.model.js"
import { Request, Response, NextFunction } from "express"


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized, token not found"
        })
    }

    try{

        // check if token is blacklisted
        const isBlackListed = await tokenBlackListModel.findOne({token: token})     

        if(isBlackListed){
            return res.status(401).json({
                success: false,
                message: "Unauthorized, token is invaild"
            })
        }

        // verify token
        const decoded = jwt.verify(token, env.JWT_SECRET) as {userID: string};

        (req as any).userID = decoded.userID;

        next()
    }catch(error){
        console.error("Error occurred while verifying token:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized, invalid token"
        })
    }



}