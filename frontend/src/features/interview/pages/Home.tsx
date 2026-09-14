
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import GradientWaves from "@/components/GradientWaves"
import { useInterview } from "../hook/useInterview"
import { useNavigate } from "react-router"

const Home = () => {
  
  const { generateReport, loading } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const handleGenerateReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resumeFile = fileInputRef.current?.files?.[0]

    const data = await generateReport(jobDescription, selfDescription, resumeFile!)
    console.log(data)
    if(data?.success && data?.interviewReport?.interviewId){
      navigate(`/interview/${data.interviewReport.interviewId}`)
    }
  }


  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative',  overflow: 'hidden' }}>

{/* Background layer */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  }}>
      <GradientWaves
    horizonColor="#5227FF"
    waveColor="#FF9FFC"
    crestColor="#FFFFFF"
    speed={0.4}
    amplitude={2.5}
    waveScale={0.6}
    waveRatio={0.9}
    swell={35}
    turbulence={20}
    tilt={1.11}
    zoom={1}
    height={5.5}
    fogDepth={15}
    detail="medium"
    brightness={1}
    opacity={1}
    mouseInteraction
    parallaxStrength={0.5}
    grain
    grainIntensity={0.05}
  />
  </div>

  {/* Content layer */}

   <main
      className="min-h-screen w-full px-6 py-16 md:px-16 lg:px-24  "
      style={{ position: 'relative', zIndex: 1 }}
    >
  
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <div className="mb-10 max-w-xl">
          <h1
            className="text-3xl md:text-4xl leading-[1.1] mb-4"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: "#F5F2E8" }}
          >
            Create Your Custom Interview Plan
          </h1>

          <p className="text-[15px] leading-relaxed" style={{ color: "#C9C3B4" }}>
            Paste the job description, attach your resume, and tell us a
            little about yourself. We&apos;ll draft the questions you&apos;re
            likely to face — and how to answer them well.
          </p>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-5 gap-10" 
        onSubmit={handleGenerateReport}>

          {/* Left: job description */}
          <div className="lg:col-span-3">
            <label
              htmlFor="jobDescription"
              className="block text-sm mb-3 font-semibold"
              style={{ color: "#B8B2A0", letterSpacing: "0.02em" }}
            >
              The role
            </label>
            <div
              className="rounded-sm"
              style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
            >
              <Textarea
              onChange={(e) => setJobDescription(e.target.value)}
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the job description here — responsibilities, requirements, anything you were given."
                className="min-h-[420px] resize-none border-0 bg-transparent p-6 text-[15px] leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A32638]"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#F5F2E8" }}
              />
            </div>
          </div>

          {/* Right: candidate details */}
          <div className="lg:col-span-2 flex flex-col">
            <label
              className="block text-sm mb-3 font-semibold"
              style={{ color: "#B8B2A0", letterSpacing: "0.02em" }}
            >
              About you
            </label>

            <div
              className="rounded-sm p-6 flex flex-col gap-6 backdrop-blur-md"
               style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
            >
              {/* Resume upload */}
              <div>
                <span className="block text-[13px] mb-2" style={{ color: "#C9C3B4" }}>
                  Resume
                </span>
                <Input
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  id="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-between rounded-sm px-4 py-3 text-left text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A32638]"
                  style={{
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: fileName ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.04)",
                      color: fileName ? "#F5F2E8" : "rgba(245, 242, 232, 0.5)",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                >
                  <span className="truncate">{fileName ?? "Attach a PDF"}</span>
                  <span className="ml-3 shrink-0 text-[12px]" style={{ color: "#FF6B7D" }}>
                    {fileName ? "Change" : "Browse"}
                  </span>
                </button>
              </div>

              {/* Self description */}
              <div>
                <label
                  htmlFor="selfDescription"
                  className="block text-[13px] mb-2"
                  style={{ color: "#C9C3B4" }}
                >
                  A few lines about you
                </label>
                <Textarea
                  onChange={(e) => setSelfDescription(e.target.value)}
                  name="selfDescription"
                  id="selfDescription"
                  placeholder="Your background, what you're proud of, what you're aiming for next."
                  className="min-h-[160px] resize-none p-3 text-[14px] leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A32638]"
                  style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#F5F2E8",
                    }}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 h-12 rounded-sm text-[15px] font-medium hover:opacity-90 transition-opacity"
              style={{
                  background: "#A32638",
                  color: "#F8F6EF",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
            >
              Generate interview questions
            </Button>
          </div>
        </form>
      </div>
    </main>

    </div>
   
  )
}

export default Home