import { Request,Response } from "express";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { tokenBlackListModel } from "../models/blackList.model.js";
import { loginUserSchema, registerUserSchema } from "../validators/user.validator.js";



/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */


export async function registerUserController(req:Request, res: Response){

    const result = registerUserSchema.safeParse(req.body)

    if(!result.success){
        return res.status(411).send({
          success: false,  
          error: "Incorrect Format",
          message: result.error.issues[0].message  
        })
    }

    const {username, email, password} = result.data

    try {
        // check if user already exists
        const userExists = await userModel.findOne({$or:[{username},{email}]})

        if(userExists){
            return res.status(400).json({
                success: false,
                message: "Account already exists with this email and username"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await userModel.create({
            username,
            email: email,
            password: hashedPassword
        });

        if(user){

            const token = jwt.sign(
                {
                userId: user._id,
                username: user.username
            }, 
            env.JWT_SECRET,
            {expiresIn: "3d"});

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
            });

            return res.status(201).json({
                success: true,
                message: "User registered  successfully...",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        }

    } catch (error) {
        console.error("Error occurred while registering user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}



/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */


export async function loginUserController(req:Request, res: Response){

    const result = loginUserSchema.safeParse(req.body) 

     if(!result.success){
        return res.status(411).send({
          error: "Incorrect Format",
          message : result.error.issues[0].message  
        })
    }

    const { email, password} = result.data

    try {
      
        const user = await userModel.findOne({
            email: email});

        if(user){

            const matchPassword = await bcrypt.compare(password, user.password);

            if(!matchPassword){
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }

            const token = jwt.sign({
                userId: user._id,
                username: user.username
            }, env.JWT_SECRET, {expiresIn: "7d"});

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            return res.status(201).json({
                success: true,
                message: "User logged in successfully...",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        }else{
            return res.status(400).json({
                success: false,
                message: "Invalid email and password"
            })
        }


    } catch (error) {
        console.error("Error occurred while logging in user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}



/**
 * @name logoutUserController
 * @description logout a user, clears the token cookie and adds the token to the blacklist
 * @access Public
 */


export async function logoutUserController(req:Request, res: Response){

    const token = req.cookies.token;
    try {

        if(!token) {
            return res.status(400).json({
                success: false,
                message: "No token found"
            })
        }

        await tokenBlackListModel.create({token: token})

         res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        console.error("Error occurred while logging out user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}





/**
 * @name getMeController
 * @description get the user details from the token, expects token in the request cookies
 * @access Private   
 */


export async function getMeController(req: Request, res: Response) {
    
    try {
       
        const user = await userModel.findById({
            _id: (req as any).user.userId
        })

        if (user) {
            return res.status(200).send({
                success: true,
                message: "user detailed fetch successfully",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
        }else{
            return res.status(404).json({
            success: false,
            message: "User not found"
            });

        }

    } catch (error) {
        console.error("Error occurred while fetching user details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}