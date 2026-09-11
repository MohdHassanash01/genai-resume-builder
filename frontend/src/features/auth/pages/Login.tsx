import { Link, useNavigate } from "react-router"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"


const Login = () => {

    const {loading, handleLogin, error} = useAuth()
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const naviagte = useNavigate()

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        await handleLogin({email,password})
        naviagte("/")
    }


    if(loading){
      return (<main>
        <h1>Loading.....</h1>
      </main>)
    }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>


<form onSubmit={handleSubmit}>

  {error && <p className="error">{error}</p>}

<div className="input-group">
    <label htmlFor="email">Email</label>
    <input
    onChange={(e) => setEmail(e.target.value)}
    type="email"
     id="email"
      placeholder="enter email..." />
</div>

<div className="input-group">
    <label htmlFor="password">Password</label>
    <input 
     onChange={(e) => {setPassword(e.target.value)}}
    type="password" id="password" placeholder="enter password..." />
</div>

<button 
type="submit"
disabled={loading}
className="button primary-button">
   {loading ? "Logging in..." : "Login"}
</button>

</form>

<p>Don't have an account? <Link to={"/register"}>Register</Link></p>

      </div>
    </main>
  )
}

export default Login
