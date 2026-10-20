import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/Notes_Logo.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'


const NoteNavbar = () => {

  const {user, isAuthenticated, logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="w-full bg-fuchsia-700 px-6 py-3 flex items-center justify-between">

      {isAuthenticated && (
        <>
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <NavLink to="/notes">
              <img className="h-12" src={logo} alt="Notes App" />
            </NavLink>
          </div>

          {/* RIGHT: Menu Items */}
          <div className="flex gap-3 items-center text-white">
            <NavLink className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition" to="/notes/dashboard">Notes</NavLink>
            <NavLink className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition" to="/notes/add-notes">Add Notes</NavLink>
            {/* <NavLink className="px-3" to="#" onClick={handleLogout} >Logout</NavLink> */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
            >
              Logout
            </button>

          </div>
        </>

      )}

    </nav>

  )
}

export default NoteNavbar