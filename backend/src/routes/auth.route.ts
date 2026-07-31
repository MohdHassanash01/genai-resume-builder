
import {Router} from "express"
import { getMeController, loginUserController, logoutUserController, registerUserController } from "../controllers/auth.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

export const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */


authRouter.post("/register",registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */


authRouter.post("/login",loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear the token cookie and logout the user and add the token to the blacklist
 * @access Public
 */
 

authRouter.get("/logout",logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the user details from the token, expects token in the request cookies
 * @access Private
 */

authRouter.get("/get-me",authMiddleware,getMeController)