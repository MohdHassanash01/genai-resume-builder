
import { GoogleGenAI } from "@google/genai";

import {z} from "zod"

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});


const interviewReportSchema = z.object({

    matchPercentage: z.number().min(0).max(100).describe("Percentage of how well the candidate matches the job description based on their resume and self-description"),
    
    technicalQuestion: z.array(z.object({
        question: z.string().describe("Technical question can be asked in the interview"),
        intention: z.string().describe("Intention of the interviewer behind asking this technical question"),
        answer: z.string().describe("how to Answer this question, what points to cover, what point to cover, what approach ")
        })).describe("List of technical questions that can be asked in the interview along with their intention and answer"),

    behaviourQuestion: z.array(z.object({
        question: z.string().describe("Behaviour question can be asked in the interview"),
        intention: z.string().describe("Intention of the interviewer behind asking this behaviour question"),
        answer: z.string().describe("how to Answer this question, what points to cover, what point to cover, what approach")
    })).describe("List of behaviour questions that can be asked in the interview along with their intention and answer"),

    skillGap: z.array(z.object({
        skill: z.string().describe("Skill that the candidate is lacking"),
        severity: z.enum(["low","medium","high"]).describe("Severity of the skill gap")
    })).describe("List of skill gaps that the candidate has along with their severity"),
  
    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number of the preparation plan"),
        focus: z.string().describe("Focus area of the preparation plan for that day"),
        task: z.array(z.string()).describe("List of tasks to be completed on that day")
    })).describe("Preparation plan for the candidate to improve their skills and prepare for the interview"),

})

const interviewReportJsonSchema = z.toJSONSchema(interviewReportSchema);


async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}: {
    resume: string;
    selfDescription: string;
    jobDescription: string;
}) {


    const prompt = `
Generate an interview report based on the following information:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportJsonSchema,
        },
    });

     const rawText = response.text;

    if (!rawText) {
        throw new Error("Gemini returned an empty response — no text to parse.");
    }

    const report = interviewReportSchema.parse(JSON.parse(response.text));

    console.log("Generated Interview Report:");
    console.log(report);

    return report;
}
