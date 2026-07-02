import React from 'react'
import logo from '../../assets/Notes_Logo.png'

const HomeNavbar = () => {
  return (
    <nav className='w-full px-7 py-1 bg-white/80 border-b-4 shadow-sm'>
      <div className='flex flex-auto px-2' >
        <img className='h-20' src={logo} alt='Notes App'></img>
        <div className='p-3'>
          <div className='text-3xl font-bold bg-gradient-to-r from-pink-600 via-orange-400 to-purple-600 bg-clip-text text-transparent'>FeatherNote</div>
          <div className='text-sm text-gray-600'>Never Lose a Great Idea</div>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar