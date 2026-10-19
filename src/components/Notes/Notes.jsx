//import React from 'react'
import NoteNavbar from '../../layout/NoteNavbar.jsx'
import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { Link } from 'react-router-dom'


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

  console.log("notes: ",notes)

  return (
    <>

      <div className="min-h-screen bg-purple-50 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800">
            My Notes
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome, {user?.fullName || "User"}! Here are your notes.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">


          {loading && (
            <p className="py-10 text-center text-purple-700">
              Loading your notes...
            </p>
          )}

          {!loading && error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200
                        bg-red-50 p-4 text-red-700"
            >
              {error}
            </div>
          )}


          {!loading && !error && notes.length === 0 && (
            <div className="rounded-2xl border border-purple-100
                            bg-white p-10 text-center shadow-md">
              <h2 className="text-xl font-semibold text-purple-800">
                No notes yet!
              </h2>

              <p className="mt-2 text-gray-500">
                Create your first note and keep your ideas organized.
              </p>

              <Link
                to="/notes/add-notes"
                className="mt-5 inline-block rounded-lg
                          bg-gradient-to-r from-pink-500 to-purple-600
                          px-5 py-3 font-medium text-white"
              >
                Create Your First Note
              </Link>
            </div>
          )}
          
        </div>


        {!loading && !error && notes.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <article
                  key={note._id}
                  className="rounded-2xl border border-purple-100
                            bg-white p-5 shadow-md transition
                            hover:-translate-y-1 hover:shadow-md"
                >
                  <h2 className="break-words text-lg font-semibold text-purple-800">
                    {note.title}
                  </h2>

                  <p className="mt-3 whitespace-pre-wrap break-words
                                text-sm leading-6 text-gray-600">
                    {note.content}
                  </p>

                  <p className="mt-5 border-t border-purple-100 pt-3
                                text-xs text-gray-400">
                    Created:{" "}
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleDateString()
                      : "Recently"}
                  </p>
                </article>
              ))}
            </div>
          )}

      </div>

    </>
  )
}

export default Notes