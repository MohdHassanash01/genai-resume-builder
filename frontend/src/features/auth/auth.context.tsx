
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

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}:{children: ReactNode}) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      
      const getAndSetUser = async() => {
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (err) {
          setUser(null)
        }finally{
           setLoading(false)
        }
      }

      getAndSetUser()

    },[])

    return <AuthContext.Provider value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError
    }}>
        {children}
    </AuthContext.Provider>

}