
import {z} from "zod"


/**
 * Validates the input required to register a new user.
 */

export const registerUserSchema = z.object({
   
     username : z.string()
    .nonempty({ message: "username is required" })
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(50, { message: "Username must be less than 50 characters" }),

    email : z.string()
    .nonempty({ message: "Email is required" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(120, { message: "Email must be less than 120 characters" })
        .email({ message: "Please enter a valid email address" }),

        password: z.string()
        .nonempty({ message: "Password is required" })
        .min(5, { message: "Password must be at least 5 characters long"})
        .max(20, { message: "Password must be less than 20 characters" }) 
        .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, {
        message: "Password must contain at least one number"
    })
    })



/**
* Validates the input required to login a new user.
 */


export const loginUserSchema = z.object({
   
    email:z.string()
    .nonempty({ message: "Email is required" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(320, { message: "Email must be less than 320 characters" })
        .email({ message: "Please enter a valid email address" }),

        password: z.string()
             .nonempty({ message: "Password is required" }) 
    })    