import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

//Test Route
app.get('/', (req, res) => {
    res.send("Notes API is running...")
})

app.use("/api/auth", authRoutes);

export default app