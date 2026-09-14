
import {createContext, useState, type ReactNode} from 'react';
import type { InterviewReport } from './interviewType';

interface interviewType{
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>

    report: InterviewReport | null
    setReport: React.Dispatch<React.SetStateAction<InterviewReport | null>>

    reports: InterviewReport[] | null
    setReports: React.Dispatch<React.SetStateAction<InterviewReport[] | null>>


}

export const InterviewContext = createContext<interviewType | null>(null);

export const InterviewProvider = ({children}:{children: ReactNode}) => {

    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<InterviewReport | null>(null);
    const [reports, setReports] = useState<InterviewReport[] | null>([]);

    return (
        <InterviewContext.Provider value={{loading, setLoading, report, setReport, reports, setReports}}>
            {children}  
        </InterviewContext.Provider>
    )
}

