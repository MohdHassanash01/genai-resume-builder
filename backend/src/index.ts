
import express from "express"
import dotenv from "dotenv"
import { env } from "./config/env.js"
import { ConnectionDB } from "./config/db.js"
import { authRouter } from "./routes/auth.route.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// testing route
app.use("/",function (req,res) {
    res.send("health ok")
})

// all routes define here
app.use("/api/auth",authRouter)


app.listen(env.PORT,function(){
    ConnectionDB()
    console.log(`server is running on PORT : ${env.PORT}`);
})