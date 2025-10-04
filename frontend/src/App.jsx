import React from 'react'
import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { Nav } from './components/Nav'

const App = () => {
  return (
    <div data-theme="forest" className='min-h-screen'>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/note/:id" element={<NoteDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App