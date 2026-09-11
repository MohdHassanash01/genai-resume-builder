import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"
import {  type ReactNode } from "react"

interface ProtectedProps {
  children: ReactNode
}

const Protected = ({ children }: ProtectedProps) => {
  const { authLoading, user } = useAuth()
  

  if (authLoading) {
    return (
      <main>
        <h1>Loading......</h1>
      </main>
    )
  }

  if(!user){
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default Protected