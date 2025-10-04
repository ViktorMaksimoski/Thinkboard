import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export const NotFound = () => {
  return (
    <div className='flex flex-col py-16 justify-center gap-4 items-center mx-auto text-center max-w-md'>
        <div className="bg-primary/10 text-primary rounded-full p-8">
           <NotebookIcon className='size-9' />
        </div>
        <h3 className="text-2xl font-bold">No notes yet</h3>
        <p className="text-base-content/70">Ready to organize your thoughts? Create your first note to get started on your journey</p>
        <Link to={"/create"} className='btn btn-primary'>
            Create Your First Note
        </Link>
    </div>
  )
}
