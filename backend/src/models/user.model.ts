
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true
    },
    email : {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    }

},{timestamps: true})


export const userModel = mongoose.model("users",userSchema)