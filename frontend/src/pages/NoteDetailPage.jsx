import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { Loader2Icon, ArrowLeftIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router'
import { RateLimited } from '../components/RateLimited'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()

  const deleteNote = async () => {
    try {
      await api.delete(`/notes/${id}`)
      navigate("/")
    } catch(err) {
      console.log("Cant delete");
      if(err.response.status === 429) {
        setRateLimited(true)
      }
      toast.error("Can't delete the note")
    }
  }

  const submit = async () => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Cant have empty fields");
      return ;
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success('Note updates successfully!!!');
    } catch(err) {
      console.log(err)
      if(err.response.status === 429) {
        setRateLimited(true)
      }
      toast.error("Can't save the new version")
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        console.log(res.data)
      } catch(err) {
        console.log(err)

        if(err.response.status === 429) {
          setRateLimited(true)
        } else {
          toast.error("Can't load the note")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  if(loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2Icon className='animate-spin size-20 text-primary' />
      </div>
    )
  }

  return (
    <div>
      <header className="bg-base-300 border-b border-base-content/10">
        <div className='mx-auto max-w-6xl p-4'>
            <div className="flex items-center justify-between">
                <Link to={"/"} className='btn btn-ghost'>
                    <ArrowLeftIcon />
                    Back to Notes
                </Link>
                {!rateLimited && note && <button onClick={deleteNote} className='flex gap-1 btn btn-error btn-outline'>
                    <TrashIcon />
                    Delete This Note
                </button>}
            </div>
        </div>
    </header>

    {rateLimited && <RateLimited />}

    {!rateLimited && note && <div className="mx-10 card bg-base-300 shadow-lg border border-base-300 mt-10">
        <div className="card-body">
          <h1 className='card-title text-base-content text-2xl'>Edit Your Note</h1>
          <form onSubmit={submit}>
            <div className="form-control mb-4">
              <label className='label'>
                <span className='label-text'>
                  Title
                </span>
              </label>
              <input type="text"
                placeholder='Note Title'
                value={note.title}
                className='input input-bordered'
                onChange={(e) => { setNote({ ...note, title: e.target.value }) }}
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
                value={note.content}
                className='textarea textarea-bordered h-32'
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>
            <div className="card-actions justify-end">
              <button type="submit" disabled={saving} className="btn btn-primary">
                { saving ? "Saving..." : "Save note" }
              </button>
            </div>
          </form>
        </div>
      </div>}
    </div>
  )
}

export default NoteDetailPage