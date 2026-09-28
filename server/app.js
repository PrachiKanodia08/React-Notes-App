import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) =>{
    res.status(200).json({
        message:"You accessed a protected route",
        userId: req.user
    })
})

export default app