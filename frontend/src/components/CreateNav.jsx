import React from 'react'
import { Link } from 'react-router'
import { PlusIcon, ArrowLeft, ArrowLeftIcon } from 'lucide-react'

export const CreateNav = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <div className='mx-auto max-w-6xl p-4'>
            <div className="flex items-center justify-between">
                <Link to={"/"} className='btn btn-ghost'>
                    <ArrowLeftIcon />
                    Back to Notes
                </Link>
            </div>
        </div>
    </header>
  )
}
