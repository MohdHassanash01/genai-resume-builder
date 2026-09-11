
import { useAuth } from "../hooks/useAuth"



const Home = () => {
  const {handleLogout} = useAuth()
  return (
    <div style={{backgroundColor:"pink"}}>
      nvjdfnvf

<button onClick={() => {
  handleLogout()
}}>logout</button>

    </div>
  )
}

export default Home
