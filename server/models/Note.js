import React from 'react'
import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required:[true, "Title is required"],
            maxlength: [100, "Title cannot excees 100 character"],
            trim: true
        },
        content:{
            type: String,
            required:[true, "Content is mandatory to save the note"],
            trim: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",

        }
    },
    {
        timestamps: true
    }
)

const Note = mongoose.model("Note", noteSchema)

export default Note