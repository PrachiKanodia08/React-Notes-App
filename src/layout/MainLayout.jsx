import React from 'react'
import NoteNavbar from '../layout/NoteNavbar.jsx'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {

  return (
    <>
      <NoteNavbar />
      <Outlet />
    </>
  )
}

export default MainLayout