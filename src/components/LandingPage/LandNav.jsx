import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/Notes_Logo.png'

const Navbar = () => {
  return (
    <nav className="w-full bg-fuchsia-700 px-6 py-3 flex items-center justify-between">
  
      {/* LEFT: Logo */}
      <div className="flex items-center">
        <NavLink to="/">
          <img className="h-10" src={logo} alt="Notes App" />
        </NavLink>
      </div>

      {/* RIGHT: Menu Items */}
      <div className="flex items-center text-white">
        <NavLink className="px-3" to="/">Home</NavLink>
        <NavLink className="px-3" to="/Notes">Notes</NavLink>
        <NavLink className="px-3" to="/AddNotes">Add Notes</NavLink>
      </div>

    </nav>

  )
}

export default Navbar