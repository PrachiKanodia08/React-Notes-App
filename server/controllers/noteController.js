import Note from "../models/Note.js"
import mongoose from "mongoose"


// Create Note
export const createNote = async (req, res) => {

    const {title, content} = req.body

    try {
        if(!title.trim() || !content.trim()){
            return(
                res.status(400).json({
                    message: "Title and Content are required"
                })
            )
        }

        const note = await Note.create({
            title: title.trim(),
            content: content.trim(),
            userId: req.user
        })

        return (
            res.status(201).json({
                message: "Note created successfully",
                note
            })
        )
        
    } catch (error) {
        console.error("Create note error: ",error)
        return (
            res.status(500).json({
            message: "Server Error: Something went wrong while creating a note"
        })
        )
        
    }

}


// Get Notes
export const getNotes = async (req, res) => {

    try {
        const notes = await Note.find({
            userId: req.user
        }).sort({createdAt: -1})

        return (
            res.status(200).json({
                count: notes.length,
                notes
            })
        )
        
    } catch (error) {
        console.error("Error in finding notes: ", error)
        return (
            res.status(500).json({
            message: "Failed to fetch notes"
        })
        )
    }

}


// Get Notes by id
export const getNoteById = async (req, res) => {

    try {

        if (!mongoose.isValidObjectId(req.params.id)){
            return (
                res.status(400).json({
                    message: "Invalid note id"
                })
            )
        }

        const note = await Note.findOne({
            userId: req.user,
            _id: req.params.id
        })

        if(!note){
            return(
                res.status(404).json({
                    message: "Note not found"
                })
            )
        }

        return (
            res.status(200).json({note})
        )
        
    } catch (error) {
        console.error("Error in finding note: ", error)
        return (
            res.status(500).json({
            message: "Failed to fetch note"
        })
        )
    }

}


// Update Note
export const updateNote = async (req, res) => {
    
    try {

        const {title, content} = req.body

        if (!title.trim() || !content.trim()){
            return (
                res.status(400).json({
                    message: "Title and Content are required"
                })
            )
        }

        if (!mongoose.isValidObjectId(req.params.id)){
            return (
                res.status(400).json({
                    message: "Invalid note id"
                })
            )
        }

        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user
            },
            {
                title: title.trim(),
                content: content.trim(),
            },
            {
                new: true,
                runValidators: true
            }
        )

        if(!note){
            return(
                res.status(404).json({
                    message: "Note not found"
                })
            )
        }

        return(
            res.status(200).json({
                message: "Note Updated successfully",
                note
            })
        )
        
    } catch (error) {
        console.error("Error in updating note: ", error)
        return (
            res.status(500).json({
            message: "Failed to update note"
        })
        )
    }
}


// Delete Note
export const deleteNote = async (req, res) => {

    try {

        if(!mongoose.isValidObjectId(req.params.id)){
            return (
                res.status(400).json({
                    message: "Invalid note id"
                })
            )
        }

        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user
        })

        if(!note){
            res.status(404).json({
                message: "Note not found"
            })
        }

        return(
            res.status(200).json({
                message: "Note successfully updated",
                note
            })
        )
        
    } catch (error) {
        console.error("Error in deleting note: ", error)
        return (
            res.status(500).json({
            message: "Failed to update note"
        })
        )
    }
}