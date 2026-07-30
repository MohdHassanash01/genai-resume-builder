
import {Router} from "express"
import { registerUserController } from "../controllers/auth.controllers.js"

export const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */


authRouter.post("/register",registerUserController)