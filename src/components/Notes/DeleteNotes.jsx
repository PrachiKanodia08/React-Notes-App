import { useAuth } from "../AuthContext"
import { useState, useEffect, use } from "react"
import { useNavigate, useParams } from "react-router-dom"

const DeleteNotes = ({deleteDetail, onClose}) => {

    const {token} = useAuth()
    // const {id} = useParams()
    // const navigate = useNavigate()

    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    //const handleChange = (e) => {}

    const handleDeleteNote = (e) => {}

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
          <h2  className="text-xl font-semibold text-gray-800">Delete note?</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">This action cannot be undone. Are you sure you want to delete?<br />Title: <span className="font-semibold text-gray-800">{deleteDetail.title}</span></p>

          {deleteError && (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {deleteError}
            </p>
          )}


          <div className="mt-6 flex justify-end gap-3">
            <button
              disabled={isDeleting}
              onClick={onClose}
              className="rounded-lg border border-gray-200
                        px-4 py-2 text-sm font-medium
                        text-gray-700 hover:bg-gray-50
                        disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              disabled={isDeleting}
              onClick={handleDeleteNote}
              className="rounded-lg bg-red-600 px-4 py-2
                        text-sm font-medium text-white
                        hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>

          {/* <button
            disabled={isDeleting}
            onClick={handleDeleteNote}
          >
            Delete
          </button> */}

        </div>
      </div>
  )
}

export default DeleteNotes