
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { env } from "./config/env.js"
import cors from "cors"
import { ConnectionDB } from "./config/db.js"
import { authRouter } from "./routes/auth.route.js"
dotenv.config()
import { interviewRouter } from "./routes/interview.route.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// testing route
// app.use("/",function (req,res) {
//     res.send("health ok")
// })

app.use((req, res, next) => {
    console.log("INCOMING:", req.method, req.originalUrl)
    next()
})


/* using all the routes here */

app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)


app.listen(env.PORT,function(){
    ConnectionDB()
    console.log(`server is running on PORT : ${env.PORT}`);
})