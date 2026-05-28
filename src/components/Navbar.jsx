import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full bg-fuchsia-700 px-6 py-5">
      <div className='flex items-center justify-end'>
        <div className='text-white'>
          <NavLink className='px-3' to='/'>Home</NavLink>
          <NavLink className='px-3' to='/Notes'>Notes</NavLink>
          <NavLink className='px-3' to='/AddNotes'>Add Notes</NavLink>
        </div>
      </div>       
    </nav>

  )
}

export default Navbar