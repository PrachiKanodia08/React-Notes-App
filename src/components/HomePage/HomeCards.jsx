import React, { useState } from 'react'
import { IoBookOutline, IoLogInOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import CreateAccount from '../CreateAccount/CreateAccount'
import LoginAccount from '../Login/LoginAccount'

const HomeCards = () => {
  const [homeSelection, setHomeSelection] = useState(null)

  const homeOptions = [
    { 
      "id":1,
      "title": "Create Account",
      "modal": "createAccount",
      "subtitle": "Create account to access and add notes",
      "style": "bg-gradient-to-br from-purple-500 to-purple-600 h-14 w-14 rounded-xl flex items-center justify-center",
      "icon": IoBookOutline
    },
    { 
      "id":2,
      "title": "Login",
      "modal": "login",
      "subtitle": "Login to access your notes",
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
            className="bg-white/80 flex flex-col items-center text-center border border-purple-100 shadow-lg rounded-2xl p-6 gap-2 cursor-pointer"
            onClick={() => setHomeSelection(option.modal)}
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

      {homeSelection && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">

          {/* Close Button */}
          <button
            onClick={() => setHomeSelection(null)}
            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>

          {/* Login Modal */}
          {homeSelection === 'login' && (
            <LoginAccount />
            // <form>
            //   <h2 className="text-2xl font-bold text-pink-500 mb-4">
            //     Login
            //   </h2>

            //   <input
            //     type="email"
            //     placeholder="Email"
            //     className="w-full border rounded-lg p-3 mb-4"
            //   />

            //   <input
            //     type="password"
            //     placeholder="Password"
            //     className="w-full border rounded-lg p-3 mb-4"
            //   />

            //   <button className="w-full bg-gradient-to-tr from-pink-500 via-orange-300 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:via-orange-400 hover:to-purple-600">
            //     Login
            //   </button>
            //   <div className='text-center p-3'>
            //     <Link to='/' className='font-bold text-pink-500'>
            //         Forgot Password?
            //     </Link>
            //   </div>
            //   <div className='text-gray-500'>Don't have an account? 
            //     <Link to='/' className='font-bold text-pink-500'>
            //          {` `}Create One
            //     </Link>
            //   </div>
            // </form>
          )}

          {/* Create Account Modal */}
          {homeSelection === 'createAccount' && (
            <CreateAccount />
          )}
        </div>
      </div>
    )}
    </div>
)


}

export default HomeCards