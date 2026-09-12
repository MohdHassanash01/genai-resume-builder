import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/file.middleware.js"
import { generateInterviewReportController} from "../controllers/interview.controller.js"

export const interviewRouter = express.Router()


/**
 * @route POST /api/interview/test
 * @description generating new interview report on the basis of user's resume, self-description and job description
 * @access Private
 */

interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController)