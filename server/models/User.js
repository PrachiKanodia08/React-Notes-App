import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minlength: [3, "Full name must be atleast 3 characters"],
            maxlength: [50, "Full name cannot exceed 50 characters"]
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be atleast 8 characters"]
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

export default User