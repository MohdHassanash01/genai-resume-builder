import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { AuthProvider } from "./features/auth/auth.context"
import { InterviewProvider } from "./features/interview/interview.contex"


const App = () => {
  return (
    <>
    <InterviewProvider>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    </InterviewProvider>
    </>
  )
}

export default App
