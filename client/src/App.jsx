import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
