import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {

    try{

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

}

export const loginUser = async (req, res) => {

    try {

        const {email, password} = req.body
        const normalizedEmail = email.trim().toLowerCase()

        //1. check mandatory fields
        if (!email || !password){
            return(
                res.status(400).json({
                    message:"Email and password are required"
                })
            )
        }

        //2. Find user
        const userExists = await User.findOne({email:normalizedEmail})
        if(!userExists){
            return(
                res.status(401).json({
                    message:"Invalid email or password"
                })
            )
        }

        //3. Check is password is correct
        const isCorrectPassword = await bcrypt.compare(
            password,
            userExists.password
        )

        if(!isCorrectPassword){
            return(
                res.status(401).json({
                    message:"Invalid email or password"
                })
            )
        }

        //4. Generate JWT
        const token = jwt.sign(
            {
                userId: userExists._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        //4. Login Successfull
        return(
            res.status(200).json({
                message:"Login Successful",
                token,
                user:{
                    id: userExists._id,
                    fullName: userExists.fullName,
                    email: userExists.email
                }
            })
        )

    } catch (error) {
        console.log("Login Error: ", error)
        res.status(500).json({
            message: "Something went wrong while logging in"
        })
    }

}


