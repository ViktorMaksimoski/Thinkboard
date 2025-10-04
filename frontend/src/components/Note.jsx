import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

export const Note = ({ note }) => {
  const deleteNote = async (e, id) => {
    e.preventDefault()

    if(!window.confirm(`Are you sure you want to delete this note? ${id}`))
        return ;

    try {
        await api.delete(`/notes/${id}`)
        toast.success("Note deleted successfully!!!")
        window.location.reload()
    } catch(err) {
        console.log(err);
        toast.error("Cannot delete the note")
    }
  }

  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 shadow-lg transition-all duration-200 border-t-4 border-solid border-primary'>
        <div className="card-body">
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className="card-actions justify-between items-center">
                <span className='text-sm text-base-content/60'>
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className='flex gap-1 items-center'>
                    <PenSquareIcon />
                    <button className='btn btn-ghost text-error btn-xs' onClick={(e) => deleteNote(e, note._id)}>
                        <Trash2Icon />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}
