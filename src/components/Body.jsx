import React from 'react'
import Navbar from './Navbar'

const Body = () => {
  return (
    <div>
        {/* note card */}
<div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
  <h2 className="text-2xl font-bold mb-4 text-blue-700">Your Voice, Your Note ✨</h2>
  <p className="text-gray-700 text-lg mb-4 leading-relaxed">
    Welcome to <span className="font-semibold">Speech-to-Text-App</span> — your personal voice-powered note-taking assistant.
    Speak your thoughts, and let us turn them into clean, readable text automatically.
  </p>
  <p className="text-gray-600 text-base mb-4">
    🎤 Simply click <strong>"Speak"</strong> to start recording, or upload your audio file directly.
    Our powerful transcription engine will convert your voice into notes instantly.
  </p>
  <p className="text-gray-600 text-base mb-4">
    📝 You can give a title to your note, review the text, and save it for later.
    No typing, no fuss — just talk, save, and organize your ideas.
  </p>
  <p className="text-sm text-gray-400">
    Built with ❤️ using React, Supabase Auth, and cutting-edge Speech-to-Text AI.
  </p>
</div>


    </div>
  )
}

export default Body
