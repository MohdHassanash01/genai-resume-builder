
import { Link, useNavigate } from "react-router"
import "../auth.form.scss"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const Register = () => {

    const {loading, handleRegister,error} = useAuth()
    
    const [username, setusername] = useState("")    
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const naviagte = useNavigate()

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const success = await handleRegister({username,email,password})
        
        if(success){
            naviagte("/")
        }
    }

  if(loading){
      return (<main>
        <h1>Loading.....</h1>
      </main>)
    }

  return (
      <main>
      <div className="form-container">
        <h1>Register</h1>

<form onSubmit={handleSubmit}>

    {error && <p className="error">{error}</p>}

<div className="input-group">
    <label htmlFor="username">Username</label>
    <input
    onChange={(e) => setusername(e.target.value)}
    type="username" id="username" placeholder="enter username..." />
</div>    

<div className="input-group">
    <label htmlFor="email">Email</label>
    <input
    onChange={(e) => setEmail(e.target.value)}
    type="email" id="email" placeholder="enter email..." />
</div>

<div className="input-group">
    <label htmlFor="password">Password</label>
    <input
    onChange={(e) => setPassword(e.target.value)}
    type="password" id="password" placeholder="enter password..." />
</div>

<button 
type="submit"
className="button primary-button"
disabled={loading}>
     {loading ? "Registering..." : "Register"}
</button>

</form>

<p>Already have an account? <Link to={"/login"}>Login</Link></p>

      </div>
    </main>
  )
}

export default Register
