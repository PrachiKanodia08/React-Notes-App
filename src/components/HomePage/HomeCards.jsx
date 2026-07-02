import React from 'react'
import { IoBookOutline, IoLogInOutline } from 'react-icons/io5'

const HomeCards = () => {
  const homeOptions = [
    { 
      "id":1,
      "title": "Browse Notes",
      "subtitle": "Access quality study materials from top students",
      "style": "bg-gradient-to-br from-purple-500 to-purple-600 h-14 w-14 rounded-xl flex items-center justify-center",
      "icon": IoBookOutline
    },
    { 
      "id":2,
      "title": "Login",
      "subtitle": "Access your notes",
      "style": "bg-gradient-to-br from-pink-500 to-pink-600 h-14 w-14 rounded-xl flex items-center justify-center",
      "icon": IoLogInOutline
    }
  ]

  return (
    <div>
      <div className='grid grid-cols-1 gap-6'>
        {homeOptions.map((option) => {
        const Icon = option.icon;
        return (
          <div
            key={option.id}
            className="bg-white/80 flex flex-col items-center text-center border border-purple-100 shadow-lg rounded-2xl p-6 gap-2"
          >
            <div className={option.style}>
              <Icon className="text-white size-7" />
            </div>
            <h2 className="font-bold">{option.title}</h2>
            <p className="font-medium text-gray-600">{option.subtitle}</p>
          </div>
        );
      })}
      </div>
    </div>
  )


}

export default HomeCards