import mongoose from "mongoose";
import { required } from "zod/mini";

/**
 *  - job decsription schema : string
 *  - resume text : string
 *  - self description : string
 *  - matchScore : Number
 *  
 *  - Technical question : 
 *     [{
 *         question: "",
 *          intention:"",
 *          answer:""
 *     }]
 * 
 * - Behaviour question : 
 *        [{
 *         question: "",
 *          intention:"",
 *          answer:""
 *     }]
 * 
 *   - skill gap: [{
 *             skill:"",
 *              severity: {
 *                  type: String,
 *                  enum: ["low","medium","high"]
 *                  }
 * 
 *          }]
 *   - preparation plan : [{
 *          day : number,
 *          focus : string,
 *          task: [string]
 *          }]
 */


const technicalQuestionShema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
},{_id: false})


const behaviourQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
},{_id: false})


const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: { 
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
},{_id: false})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,   
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    task: [{
        type: String,
        required: [true, "Task is required"]
    }]
},{_id: false})


const interviewReportSchema = new mongoose.Schema({

    jobDescription : {
        type: String,
        required: [true,"Job description is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionShema],
    behaviourQuestions: [behaviourQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"]
    }

})

export const InterviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);
