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
            onClick={handleDeleteNote}
            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>

        </div>
      </div>
  )
}

export default DeleteNotes