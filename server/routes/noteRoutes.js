import express from "express"
import { createNote, getNotes, updateNote, deleteNote, getNoteById } from "../controllers/noteController.js"
import authMiddleware from "../middleware/authMiddleware.js"


const router = express.Router()

// All routes in this file require a valid JWT
router.use(authMiddleware)

// Create note
router.post("/", createNote)

// Get note
router.get("/", getNotes)

// Get note by id
router.get("/:id", getNoteById)

// Update note
router.put("/:id", updateNote)

// Delete note
router.delete("/:id", deleteNote)

export default router