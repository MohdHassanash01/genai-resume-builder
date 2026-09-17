
import { useContext } from "react"
import {generateInterviewReport,getInterviewReport,getAllInterviewReports} from "../services/interview.api"
import { InterviewContext } from "../interview.contex"
import { getErrorMessage } from "@/utils/getErrorMessage"


export const useInterview = () => {

    const contex = useContext(InterviewContext)

    if(!contex){
        throw new Error("useInterview must be used within InterviewProvider")
    }

    const {loading,setLoading,report,setReport,reports,setReports} = contex


    const generateReport = async (jobDescription:string,
     selfDescription:string,
     resume:File) => {

        setLoading(true)
        try {
            const res = await generateInterviewReport(jobDescription, selfDescription, resume)    
            console.log(res.data);
            
            if(res.success){
                setReport(res.data)
            }

            return res.data._id

        } catch (error) {

        console.log("error occur during register :", error);
        const message = getErrorMessage(error);
        console.log(message);
        
        return false
        } finally {
            setLoading(false)
        }
    }


    const getReport = async (interviewId:string) => {

        setLoading(true)
        try {
            const res = await getInterviewReport(interviewId)
            console.log(res);
            
            if(res.success){
                setReport(res.data)
            }
        } catch (error) {
        console.log("error occur during register :", error);
        const message = getErrorMessage(error);
        console.log(message);
        } finally {
            setLoading(false)
        }
    }


    const getReports = async (interviewId:string) => {
        setLoading(true)
        try {
            const res = await getAllInterviewReports(interviewId)   
            if(res.success){
                setReports(res.interviewReports)
            }
        } catch (error) {
        console.log("error occur during register :", error);
        const message = getErrorMessage(error);
        console.log(message);

        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        report,
        reports,
        generateReport,
        getReport,
        getReports
    }


}
