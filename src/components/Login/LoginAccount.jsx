import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const LoginAccount = () => {

    const [LoginAccountData, setLoginAccountData] = useState({
      email:"",
      password:""
    })

  return (
    <form>
      <h2 className="text-2xl font-bold text-pink-500 mb-4">
        Login
      </h2>

      <input
        type="email"
        name="email"
        value={LoginAccountData.email}
        placeholder="Email"
        className="w-full border rounded-lg p-3 mb-4"
      />

      <input
        type="password"
        name="password"
        value={LoginAccountData.password}
        placeholder="Password"
        className="w-full border rounded-lg p-3 mb-4"
      />

      <button className="w-full bg-gradient-to-tr from-pink-500 via-orange-300 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:via-orange-400 hover:to-purple-600">
        Login
      </button>
      <div className='text-center p-3'>
        <Link to='/' className='font-bold text-pink-500'>
            Forgot Password?
        </Link>
      </div>
      <div className='text-gray-500'>Don't have an account? 
        <Link to='/' className='font-bold text-pink-500'>
              {` `}Create One
        </Link>
      </div>
    </form>
  )
}

export default LoginAccount