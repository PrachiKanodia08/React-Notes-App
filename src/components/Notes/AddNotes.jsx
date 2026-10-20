import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../AuthContext"


const AddNotes = () => {

    const {token} = useAuth()
    const navigate = useNavigate()

    const [noteData, setNoteData] = useState({
        title: "",
        content: ""
    })

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) =>{

        const {name, value} = e.target
        setNoteData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleAddNote = async (e) =>{
        e.preventDefault()

        console.log("handle Add note is running")

        setError("")
        setSuccess("")

        const title = noteData.title.trim()
        const content = noteData.content.trim()

        if(!token){
            setError("Your session has expired. Please login again")
        }

        if(!title || !content){
            setError("Title and content are mandatory")
        }

        setIsLoading(true)

        console.log("title: ", title)
        console.log("content: ", content)

        try {
            
            const response = await fetch (
                `${import.meta.env.VITE_API_URL}/api/notes`,
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: title,
                        content: content
                    })
                }
            )

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || "Failed to create note.")
            }

            setSuccess("Your note was saved successfully!")

            setNoteData({
                title: "",
                content: ""
            })

            // Return to the dashboard after the note is saved.
            navigate("/notes/dashboard", {
                state: { message: "Note created successfully!" },
            })

        } catch (error) {
            setError(error.message || "Something went wrong. Please try again.");
        }finally {
            setIsLoading(false)
        }


    }

  return (

    <div className="min-h-screen bg-purple-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/notes/dashboard"
          className="text-sm font-medium text-purple-700 hover:text-purple-900"
        >
          &larr; Back to My Notes
        </Link>

        <div className="mt-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-md sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-purple-800">
              Create a Note
            </h1>

            <p className="mt-2 text-gray-500">
              Capture your ideas, thoughts, and study notes.
            </p>
          </div>

          <form onSubmit={handleAddNote} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-medium text-gray-700"
              >
                Note Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={noteData.title}
                onChange={handleChange}
                placeholder="e.g. React Interview Questions"
                maxLength={70}
                //required
                className="w-full rounded-lg border border-purple-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {noteData.title.length}/70
              </p>
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block font-medium text-gray-700"
              >
                Note Content
              </label>

              <textarea
                id="content"
                name="content"
                value={noteData.content}
                onChange={handleChange}
                placeholder="Write your note here..."
                rows={8}
                //required
                className="w-full resize-y rounded-lg border border-purple-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-lg bg-gradient-to-r from-pink-500 via-orange-300 to-purple-500 px-5 py-3 font-semibold text-white transition hover:from-pink-600 hover:via-orange-400 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Saving Note..." : "Save Note"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/notes/dashboard")}
                className="rounded-lg border border-purple-200 px-5 py-3 font-medium text-purple-700 transition hover:bg-purple-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>


    // <form onSubmit={handleAddNote}>

    //     <label htmlFor="title">Title</label>
    //     <input 
    //         name="title"
    //         value={noteData.title}
    //         onChange={handleChange}
    //     />

    //     <label htmlFor="content">Content</label>
    //     <input
    //         name="content"
    //         value={noteData.content}
    //         onChange={handleChange}
    //     />

    //     <button type="submit">
    //         Add Note
    //     </button>

    // </form>
    
  )
}

export default AddNotes