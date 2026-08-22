import React, { useState } from 'react'

const CreateAccount = () => {

    const [createAccountData, setCreateAccountData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => {

        const {name, value} = e.target
        setCreateAccountData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleRegister = async (e) => {
        e.preventDefault()

        setMessage("")
        setError("")

        if(createAccountData.password != createAccountData.confirmPassword){
            setError("Passwords do not match")
            return
        }

        try{

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    header:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        "fullName": createAccountData.fullName,
                        "email": createAccountData.email,
                        "password": createAccountData.password
                    })
                }
            )

            const returnData = await response.json()

            if(!response.ok){
                setError(returnData.message || "Unable to create account")
                return
            }

            setMessage(returnData.message)

            //clear form
            setCreateAccountData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

        } catch(error){
            setError("Unable to connect to the server")
        }
    }

  return (
    <form submit={handleRegister}>
        <h2 className="text-2xl font-bold text-pink-500 mb-4">
            Create Account
        </h2>

        <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={createAccountData.fullName}
            onChange={handleChange}
        />

        <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 mb-4"
            value={createAccountData.email}
            onChange={handleChange}
        />

        <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 mb-4"
            value={createAccountData.password}
            onChange={handleChange}
        />

        <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-3 mb-4"
            value={createAccountData.confirmPassword}
            onChange={handleChange}
        />

        {error && (
            <p>{error}</p>
        )}

        {message && (
            <p>{message}</p>
        )}

        <button 
            type ="submit"
            className="w-full bg-gradient-to-tr from-pink-500 via-orange-300 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:via-orange-400 hover:to-purple-600"
        >
            Create Account
        </button>
    </form>
  )
}

export default CreateAccount