import bcrypt from "bcrypt"
import User from "../models/User.js"


export const registerUser = async (req, res) => {

    try{

        console.log("request check: ",req)

        const {fullName, email, password} = req.body

        // 1. Check if mandatory details are entered
        if(!fullName || !email || !password){
            return(
                res.status(400).json({
                    message: "Full name, email and password are required"
                })
            )
        }

        const normalizedEmail = email.trim().toLowerCase();

        // 2. Check if user already exits
        const existingUser = await User.findOne({email:normalizedEmail})
        if(existingUser){
            return(
                res.status(409).json({
                    message: "An account with this email already exists"
                })
            )
        }

        //3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        //4. Create new User
        const user = await User.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword
        })

        //5. Send response
        res.status(201).json({
            message: "Account has been successfully created",
            user:{
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })

    } catch (error){
        console.error("Registration error: ", error)
        res.status(500).json({
            message: "Something went wrong while creating the account"
        })
    }


    // res.json({
    //     message: "Register API Working"
    // })
}


