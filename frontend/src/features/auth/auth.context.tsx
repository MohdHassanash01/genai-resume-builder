
import { createContext, useEffect, useState, type ReactNode } from "react";
import { getMe } from "./services/auth.api";


interface User {
  id: string;
  username: string
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>

  authLoading: boolean;
  setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;

  actionLoading: boolean;
  setActionLoading: React.Dispatch<React.SetStateAction<boolean>>;

  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}:{children: ReactNode}) => {

    const [user, setUser] = useState<User | null>(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      
      const getAndSetUser = async() => {
        try {
            const data = await getMe()
            setUser(data.user)
        } catch  {
          setUser(null)
        }finally{
           setAuthLoading(false)
        }
      }

      getAndSetUser()

    },[])

    return <AuthContext.Provider value={{
        user,
        setUser,
        authLoading,
        setAuthLoading,
        error,
        setError,
        actionLoading,
        setActionLoading
    }}>
        {children}
    </AuthContext.Provider>

}