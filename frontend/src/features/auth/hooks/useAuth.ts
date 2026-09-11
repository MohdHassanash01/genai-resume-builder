
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

    const { user, setUser, loading, setLoading, error, setError} = context

    const handleLogin = async({email,password}:{email:string, password: string}) => {

    try {
        setLoading(true)
        const data = await login(email, password)
        setUser(data.user)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setError(error.response?.data?.message)
            console.log(error.response?.data?.message);
    }
        }finally{
            setLoading(false)
        }
    }


     const handleRegister = async({username, email,password}:{username: string, email:string, password: string}) => {

      try {
        
        setLoading(true)
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
        setLoading(false)
      }
    }


    const handleLogout = async() => {

        try {
        setLoading(true)
        await logout()
        setUser(null)

        } catch (error) {
            const message = getErrorMessage(error);

            setError(message);
            console.log("error occur during logout :", error);
        }finally{
            setLoading(false)
        }
    }


    return {
        user,
        loading,
        error,
        handleRegister,
        handleLogin,
        handleLogout
    }
}