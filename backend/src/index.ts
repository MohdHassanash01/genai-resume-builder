
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { env } from "./config/env.js"
import cors from "cors"
import { ConnectionDB } from "./config/db.js"
import { authRouter } from "./routes/auth.route.js"
dotenv.config()
import {resume, selfDescription, jobDescription} from "./temp.js"
import { generateInterviewReport } from "./services/ai.service.js"

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


/* using all the routes here */

app.use("/api/auth",authRouter)


generateInterviewReport({
    resume,
    selfDescription,
    jobDescription})

app.listen(env.PORT,function(){
    ConnectionDB()
    console.log(`server is running on PORT : ${env.PORT}`);
})