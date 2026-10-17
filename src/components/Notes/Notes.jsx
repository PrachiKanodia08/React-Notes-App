//import React from 'react'
import NoteNavbar from './NoteNavbar'
import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'


const Notes = () => {

  //const user = JSON.parse(localStorage.getItem("user"))
  const {user, token} = useAuth()

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    const fetchNotes = async () => {

      //const token = localStorage.getItem("token");
      //const {token} = useAuth()
      setLoading(true)
      setError("")

      try {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/notes`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
        );

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch data")
        }

        setNotes(data.notes || [])


      } catch (error) {
          console.error(error);
          setError(error.message || "Unable to load your notes");

      } finally {
          setLoading(false)
      }
    };

    if (token) {
      fetchNotes();
    } else {
      setNotes([]);
      setError("Please log in to view your notes.");
      setLoading(false);
    }

  }, [token]);

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

        </div>
    </>
  )
}

export default Notes