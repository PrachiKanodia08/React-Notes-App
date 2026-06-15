import React from 'react'
import Navbar from '../components/HomePage/Navbar'
import { Outlet } from 'react-router-dom'
import notes from '../notes.json'

const MainLayout = () => {
  console.log(notes)
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default MainLayout