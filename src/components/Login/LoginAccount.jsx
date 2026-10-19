import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const LoginAccount = () => {

    const [LoginAccountData, setLoginAccountData] = useState({
      email:"",
      password:""
    })

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const {login} = useAuth()

    const navigate = useNavigate()

    const handleChange = (e) => {

      const {name, value} = e.target
      setLoginAccountData((prev) => ({
        ...prev,
        [name]: value
      }))

    }

    const handleLogin = async (e) =>{
      e.preventDefault()

      console.log("handleLogin is running")

      setMessage("")
      setError("")

      if(!LoginAccountData.email || !LoginAccountData.password){
        setError("Email and password are required")
        return
      }

      try {
        
        const response = await fetch(
          "http://localhost:5000/api/auth/login", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "email": LoginAccountData.email,
              "password": LoginAccountData.password
            })
          }
        )

        const data = await response.json()

        if(!response.ok){
          setError(data.message || "Login failed")
          return
        }        

        login(data.token, data.user)
        
        // Redirect to Notes Dashboard
        navigate(`/notes/dashboard`)

      } catch (error) {

        console.error("Login error:", error)
        setError("Unable to connect to the server")
      }

    }

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-2xl font-bold text-pink-500 mb-4">
        Login
      </h2>

      <input
        type="email"
        name="email"
        value={LoginAccountData.email}
        placeholder="Email"
        className="w-full border rounded-lg p-3 mb-4"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        value={LoginAccountData.password}
        placeholder="Password"
        className="w-full border rounded-lg p-3 mb-4"
        onChange={handleChange}
      />

      {message && (
        <p className="text-green-600 text-sm mb-3">{message}</p>
      )}

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      <button
          type="submit" 
          className="w-full bg-gradient-to-tr from-pink-500 via-orange-300 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:via-orange-400 hover:to-purple-600">
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