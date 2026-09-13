
import {login, register, logout} from "../services/auth.api"
import { AuthContext } from "../auth.context"
import { useContext } from "react"
import axios from "axios"
import { getErrorMessage } from "@/utils/getErrorMessage"




export const useAuth = () => {

    const context = useContext(AuthContext)

      if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

    const { user, setUser, authLoading, setAuthLoading, error, setError, actionLoading,
        setActionLoading} = context

    const handleLogin = async({email,password}:{email:string, password: string}) => {

    try {
        setActionLoading(true)
        setError(null)

        const data = await login(email, password)
        setUser(data.user)
        return true

    } catch (error) {
        if (axios.isAxiosError(error)) {
            setError(error.response?.data?.message)
            console.log(error.response?.data?.message);
            return false;
    }
        }finally{
            setActionLoading(false)
        }
    }


     const handleRegister = async({username, email,password}:{username: string, email:string, password: string}) => {

      try {
        
        setActionLoading(true)
        setError(null)
        const data = await register(username, email, password)

        setUser(data.user)
        return true
      } catch (error) {
        console.log("error occur during register :", error);
        const message = getErrorMessage(error);
        setError(message);
        return false
        
      }finally{
        setActionLoading(false)
      }
    }


    const handleLogout = async() => {

        try {
        setActionLoading(true)
        await logout()
        setUser(null)

        } catch (error) {
            const message = getErrorMessage(error);

            setError(message);
            console.log("error occur during logout :", error);
        }finally{
            setActionLoading(false)
        }
    }

    

    return {
        user,
        authLoading,
        setAuthLoading,
        error,
        handleRegister,
        handleLogin,
        handleLogout,
        actionLoading,
        setActionLoading
    }
}