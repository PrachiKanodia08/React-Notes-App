import React from 'react'
import {Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './components/HomePage/HomePage'
import Notes from './components/Notes/Notes'
import ProtectedRoute from './components/ProtectedRoute'
import AddNotes from './components/Notes/AddNotes'


const App = () => {
  return (
    <Routes>
      
      <Route 
          path="/" 
          element={<HomePage />} 
      />

      <Route 
          path="/notes" 
          element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>} 
      />

      <Route 
          path="/add-notes" 
          element={
              <ProtectedRoute>
                <AddNotes />
              </ProtectedRoute>} 
      />
              
      {/* <MainLayout /> */}

    </Routes>
    
  )
}

export default App

