
import { useContext } from "react"
import {generateInterviewReport,getInterviewReport,getAllInterviewReports} from "../services/interview.api"
import { InterviewContext } from "../interview.contex"


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

            if(res.success){
                setReport(res.interviewReport)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getReport = async (interviewId:string) => {

        setLoading(true)
        try {
            const res = await getInterviewReport(interviewId)
            
            if(res.success){
                setReport(res.interviewReport)
            }
        } catch (error) {
            console.log(error)
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
            console.log(error)
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
