export interface QAItem {
  question: string;
  intention: string;
  answer: string;
}

export interface SkillGap {
  skill: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PreparationDay {
  day: number;
  focus: string;
  task: string[];
}

export interface InterviewReport {
  jobDescription: string;
  resume: string;
  selfDescription: string;
  matchScore: number;
  technicalQuestions: QAItem[];
  behaviourQuestions: QAItem[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationDay[];
  user: string;
  _id: string;
  __v: number;
}

export interface InterviewReportResponse {
  success: boolean;
  message: string;
  data: InterviewReport;
}