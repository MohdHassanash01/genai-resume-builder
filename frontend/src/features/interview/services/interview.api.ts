
import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true 
})


/**
 * @description service to generate interview report based on job description, self description and resume
 */

export  const generateInterviewReport = async (jobDescription: string, selfDescription: string,resume: string) => {

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const res = await  api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data 

}


/**
 * @description service to get interview report based on interviewId
 */

export const getInterviewReport = async (interviewId:string) => {
    const res = await api.get(`/api/interview/report/${interviewId}`);
    return res.data
}


/**
 * @description service to get all interview reports based on interviewId
 */

export const getAllInterviewReports =  async (interviewId:string) => {
    const res = await  api.get(`/api/interview/reports/${interviewId}`);
    return res.data
}