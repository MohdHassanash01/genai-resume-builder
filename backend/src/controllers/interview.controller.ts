
import  {PDFParse}   from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js"
import { InterviewReportModel } from "../models/interviewReport.model.js";
import { Request, Response } from "express";



export async function generateInterviewReportController(    req: Request, res: Response)    { 
    
    try{
        const resumeFile = req.file;

    if (!resumeFile) {
        return res.status(400).json({
        success: false,
        message: "Resume file is required"
        });
        }

    
      if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
    
    const resumeContent = await (new PDFParse(Uint8Array.from(resumeFile.buffer))).getText()

    const { selfDescription, jobDescription } = req.body ;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    console.log("Generated Interview Report:");
    console.log(interviewReportByAi);

    const interviewReport = await InterviewReportModel.create({
        
        user: req.user.userId,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,

        matchScore: interviewReportByAi.matchPercentage,

        technicalQuestions: interviewReportByAi.technicalQuestion,

        behaviourQuestions: interviewReportByAi.behaviourQuestion,

        skillGaps: interviewReportByAi.skillGap,

        preparationPlan: interviewReportByAi.preparationPlan,
    })

    return res.status(201).json({
        success: true,
        message: "Interview report generated successfully",
        data: interviewReport
    })

    }catch(error){
        console.error("Error generating interview report:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
   
}