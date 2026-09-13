import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/file.middleware.js"
import { generateInterviewReportController, getInterviewReportController} from "../controllers/interview.controller.js"

export const interviewRouter = express.Router()


/**
 * @route POST /api/interview/test
 * @description generating new interview report on the basis of user's resume, self-description and job description
 * @access Private
 */

interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController)


/**
 * @route GET /api/interview/report/:interviewId
 * @description fetching the interview report on the basis of interviewId
 * @access Private 
 */

interviewRouter.get("/report/:interviewId", authMiddleware, getInterviewReportController)


/**
 * @route GET /api/interview/reports/:interviewId
 * @description fetching the interview reports on the basis of interviewId
 * @access Private 
 */

interviewRouter.get("/reports/:interviewId", authMiddleware, getInterviewReportController)