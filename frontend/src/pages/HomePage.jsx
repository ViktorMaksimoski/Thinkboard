/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import { RateLimited } from '../components/RateLimited'
import axios from "axios"
import toast from "react-hot-toast"
import { Note } from '../components/Note'
import { Nav } from '../components/Nav'
import api from '../lib/axios'
import { NotFound } from '../components/NotFound'

export const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async() => {
      try {
        const res = await api.get("/notes")
        console.log(res.data)

        setNotes(res.data)
        setRateLimited(false)
      } catch(err) {
        console.log(`Error fetching notes. Got response type ${err.response.status}`)
        console.log(err)
        
        if(err.response.status == 429) setRateLimited(true)
        else toast.error("Failed to load notes")
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div>
      <Nav />

      {rateLimited ? <RateLimited /> : <></>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && <div className='text-center text-2xl text-primary/70'>Loading Notes...</div>}
      
          {notes.length === 0 && !rateLimited && <NotFound />}

          {notes.length > 0 && !rateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cold-3 gap-6">
              {notes.map(note => (
                <Note key={note._id} note={note} />
              ))}
            </div>
          )}
      </div>  
    </div>
  )
}
