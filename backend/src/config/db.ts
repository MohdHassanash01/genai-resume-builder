
import mongoose from "mongoose";
import {env} from "../config/env.js"

export function ConnectionDB(){

    try {
        mongoose.connect(env.MONGODB_URI)
        console.log("mongoDB connected successfully....");

    } catch (error) {
        console.error("[db] MongoDB connection failed", error);
        process.exit(1);
    }

}