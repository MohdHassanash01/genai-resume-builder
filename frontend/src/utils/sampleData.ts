
interface Report {
  matchScore: number
  technicalQuestions: { question: string; intention: string; answer: string }[]
  behavioralQuestions: { question: string; intention: string; answer: string }[]
  preparationPlan: { day: number; focus: string; tasks: string[] }[]
  skillGaps: { skill: string; severity: 'high' | 'medium' | 'low' }[]
}

export const report: Report = {
     "matchScore": 95,
        "technicalQuestions": [
            {
                "question": "How did you implement background job processing using BullMQ and Redis in your SecondBrain project, and how do you handle job failures and retries?",
                "intention": "To assess the candidate's understanding of asynchronous architecture, queue management, and system resiliency in backend Node.js applications.",
                "answer": "Explain how BullMQ queue producers push jobs to Redis, how workers process asynchronous email reminders, and how backoff strategies along with retry logic are configured for handling failures gracefully."
            },
            {
                "question": "How do Yjs and WebSockets enable real-time state synchronization in your Collaborative Code Editor, and how are document conflicts resolved?",
                "intention": "To evaluate deep technical knowledge of real-time communication protocols, web sockets, and Conflict-free Replicated Data Types (CRDTs).",
                "answer": "Discuss CRDT principles used by Yjs to merge concurrent text edits deterministically across client instances without central lock-step synchronization over WebSocket connections."
            },
            {
                "question": "How do you securely integrate Generative AI APIs like Gemini into a MERN application without exposing sensitive keys or exceeding rate limits?",
                "intention": "To test understanding of backend proxying, environment management, and rate limiting strategies for AI service integrations.",
                "answer": "Detail routing requests through Express.js endpoints with environment variables storing API keys, applying Redis-based rate limiters, and streaming text responses back to the React frontend."
            }
        ],
        "behavioralQuestions": [
            {
                "question": "Describe a scenario where you had to quickly learn a new technology like Generative AI while delivering project features on tight deadlines.",
                "intention": "To measure learning agility, time management, and adaptability in fast-paced software development environments.",
                "answer": "Use the STAR approach to describe the task background, how learning was prioritized alongside delivery, the specific implementation steps taken, and the positive outcome of the project."
            },
            {
                "question": "Tell me about a production issue or failing background service you encountered and how you diagnosed and fixed it.",
                "intention": "To evaluate debugging capability, operational awareness, and problem-solving mindset under pressure.",
                "answer": "Outline the problem identification process using logs/metrics, root-cause isolation within Docker or cloud environment, immediate mitigation, and long-term fix implemented."
            }
        ],
        "skillGaps": [
            {
                "skill": "Automated Testing Frameworks (Jest, Cypress, RTL)",
                "severity": "medium"
            },
            {
                "skill": "Infrastructure as Code (Terraform or AWS CloudFormation)",
                "severity": "low"
            }
        ],
        "preparationPlan": [
            {
                "day": 1,
                "focus": "Full Stack & System Architecture Review",
                "tasks": [
                    "Review TypeScript patterns, React performance optimization, and Express middle-ware architectures.",
                    "Practice explaining MongoDB indexing and PostgreSQL schema design decisions."
                ]
            },
            {
                "day": 2,
                "focus": "Real-Time Systems & Queue Management",
                "tasks": [
                    "Deep dive into BullMQ worker configurations, dead letter queues, and Redis caching layers.",
                    "Review WebSockets and Yjs CRDT concurrency mechanisms for technical deep-dive questions."
                ]
            },
            {
                "day": 3,
                "focus": "DevOps, Cloud & AI Integrations",
                "tasks": [
                    "Review AWS ECS, ECR container workflows, and Docker containerization best practices.",
                    "Prepare code samples and explanations for Generative AI API integrations and prompt handling."
                ]
            },
            {
                "day": 4,
                "focus": "Behavioral Questions & Mock Practice",
                "tasks": [
                    "Structure STAR responses for past internship and personal project accomplishments.",
                    "Conduct a timed mock technical interview covering full stack and architectural scenarios."
                ]
            }
        ],
}