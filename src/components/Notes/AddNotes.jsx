import { Link } from "react-router-dom"
import NoteNavbar from "../../layout/NoteNavbar"


const AddNotes = () => {
  return (
    <>
        <div>AddNotes</div>
        <Link to="/notes/dashboard" >Back to Dashboard</Link>
    </>
    
  )
}

export default AddNotes