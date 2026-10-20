import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Notes = () => {

  //const user = JSON.parse(localStorage.getItem("user"))
  const {user, token} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [toastMessage, setToastMessage] = useState(location.state?.message || "")
  //const successMessage = location.state?.message

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect (() => {

    if(!toastMessage) return

    const timer = setTimeout(()=>{
      setToastMessage("")
    }, 5000)

    return () => clearTimeout(timer)

  }, [toastMessage] )


  const closeToast = () => {

    setToastMessage("")
    navigate(location.pathname,{
      replace: true,
      state: null
    })

  }


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

          {toastMessage && (
            <div
              role="status"
              className="fixed right-5 top-5 z-50 flex w-[calc(100%-2.5rem)]
                        max-w-sm items-start gap-3 rounded-xl
                        border border-green-200 bg-white p-4 pr-10
                        text-green-800 shadow-lg"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center
                              justify-center rounded-full bg-green-100
                              text-sm font-bold text-green-700">
                ✓
              </span>

              <p className="flex-1 pt-0.5 text-sm font-medium">
                {toastMessage}
              </p>

              <button
                type="button"
                onClick={closeToast}
                aria-label="Dismiss notification"
                className="absolute right-2 top-2 rounded-md p-1
                          text-gray-400 transition hover:bg-gray-100
                          hover:text-gray-700"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}          

          <h1 className="text-3xl font-bold text-purple-800">
            My Notes
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome, {user?.fullName || "User"}! Here are your notes.
          </p>

          {/* {successMessage && (
            <p
              role="status"
              className="mb-5 rounded-lg border border-green-200
                        bg-green-50 p-3 text-green-700 max-w-sm max-w-md max-w-lg"
            >
              {successMessage}
            </p>
          )} */}
          
        </div>
        <div className="mx-auto max-w-3xl">

          {/* {successMessage && (
            <p
              role="status"
              className="mb-5 rounded-lg border border-green-200
                        bg-green-50 p-3 text-green-700"
            >
              {successMessage}
            </p>
          )} */}

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