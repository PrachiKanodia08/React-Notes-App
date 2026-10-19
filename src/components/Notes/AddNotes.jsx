import { Link } from "react-router-dom"
import NoteNavbar from "../../layout/NoteNavbar"


const AddNotes = () => {
  return (
    <>
        <NoteNavbar />
        <div>AddNotes</div>
        <Link to="/notes" >Back to Dashboard</Link>
    </>
    
  )
}

export default AddNotes