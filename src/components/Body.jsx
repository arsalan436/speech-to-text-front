import React from 'react'
import Navbar from './Navbar'

const Body = () => {
return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
    {/* note card */}
    <div className="max-w-3xl mx-auto mt-10 bg-gradient-to-tr from-[#1e293b] to-[#334155] shadow-2xl rounded-2xl p-8 border border-gray-600">
      <h2 className="text-2xl font-bold mb-4 text-indigo-300">Your Voice, Your Note ✨</h2>
      
      <p className="text-slate-100 text-lg mb-4 leading-relaxed">
        Welcome to <span className="font-semibold text-indigo-200">Speech-to-Text-App</span> — your personal voice-powered note-taking assistant.
        Speak your thoughts, and let us turn them into clean, readable text automatically.
      </p>
      
      <p className="text-slate-300 text-base mb-4">
        🎤 Simply click <strong className="text-indigo-200">"Speak"</strong> to start recording, or upload your audio file directly.
        Our powerful transcription engine will convert your voice into notes instantly.
      </p>
      
      <p className="text-slate-300 text-base mb-4">
        📝 You can give a title to your note, review the text, and save it for later.
        No typing, no fuss — just talk, save, and organize your ideas.
      </p>
      
      <p className="text-sm text-slate-400 italic">
        Built with ❤️ using React, Supabase Auth, and cutting-edge Speech-to-Text AI.
      </p>
    </div>
  </div>
);

}

export default Body
