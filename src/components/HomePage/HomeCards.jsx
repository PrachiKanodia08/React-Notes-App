import React from 'react'
import { IoBookOutline } from 'react-icons/io5'

const HomeCards = () => {
  const homeOptions = [
    { 
      "id":1,
      "title": "Browse Notes",
      "subtitle": "Access quality study materials from top students"
    },
    { 
      "id":2,
      "title": "Login",
      "subtitle": "Access your notes"
    }
  ]

  return (
    <div>
      <div className='grid grid-cols-1 gap-6'>
        {homeOptions.map((option) => (
          <div key = {option.id} className='bg-white/80 text-center border border-purple-100 shadow-lg rounded-2xl p-4' >
            <div></div>
            <h2 className='font-bold'>{option.title}</h2>
            <p className='font-medium text-gray-600'>{option.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeCards