import React from 'react'
import { CreateNav } from '../components/CreateNav'
import { useState } from 'react';
import toast from 'react-hot-toast'
import api from '../lib/axios'
import { useNavigate } from 'react-router';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    
    if(!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return ;
    }

    setLoading(true)

    try {
      await api.post("/notes", {
        title,
        content
      })

      toast.success("Note created successfully!")
      navigate("/")
    } catch(err) {
      if(err.response.status == 429) {
          toast.error("Too many request!!!")
      } else {
          toast.err("Can't create the note! Try again")
      }
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen'>
      <CreateNav />

      <div className="mx-10 card bg-base-300 shadow-lg border border-base-300 mt-10">
        <div className="card-body">
          <h1 className='card-title text-base-content text-2xl'>Create New Note</h1>
          <form onSubmit={submit}>
            <div className="form-control mb-4">
              <label className='label'>
                <span className='label-text'>
                  Title
                </span>
              </label>
              <input type="text"
                placeholder='Note Title'
                value={title}
                className='input input-bordered'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className='label'>
                <span className='label-text'>
                  Content
                </span>
              </label>
              <textarea type="text"
                placeholder='Note Content'
                value={content}
                className='textarea textarea-bordered h-32'
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end">
              <button type="submit" disabled={loading} className="btn btn-primary">
                { loading ? "Creating..." : "Create note" }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage