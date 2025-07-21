import React from 'react'
import Navbar from './Navbar'

const AllNotes = () => {
  return (
    <div>
        <Navbar/>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">My Note Title</h2>
      <p className="text-gray-700 mb-4">
        This is a short description of the note. You can click Edit to modify it or Delete to remove it.
      </p>

      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition">
          Edit
        </button>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition">
          Delete
        </button>
      </div>
    </div>
    </div>
  )
}

export default AllNotes
