import React from 'react'
import NoteNavbar from './NoteNavbar'
import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'


const Notes = () => {

  //const user = JSON.parse(localStorage.getItem("user"))
  const {user, token} = useAuth()

  const [notes, setNotes] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {

    const fetchNotes = async () => {

      //const token = localStorage.getItem("token");
      //const {token} = useAuth()

      try {

        const response = await fetch(
            "http://localhost:5000/api/protected",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
        );

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch data")
        }

        console.log("data : ",data)

        //setNotes(data)

      } catch (error) {
          console.error(error);
          setError(error.message);
      }
    };

      fetchNotes();
  }, []);

  return (
    <>
      <NoteNavbar />
        <div className="min-h-screen bg-purple-50 p-8">

          <h1 className="text-3xl font-bold text-purple-700">
            My Notes
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome, {user?.fullName}!
          </p>

          <div className="mt-8">
            <p className="text-gray-500">
              Your notes will appear here.
            </p>
          </div>

          <div>{console.log("notes : ",notes)}</div>

        </div>
    </>
  )
}

export default Notes