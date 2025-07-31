import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { supabase } from '../../utils/supabaseClient';
import { AuthContext } from '../../utils/AuthContext';

const CreateNote = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [title, setTitle] = useState('');
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const recordedAudioBlob = useRef(null);

  const API_BASE_URL = process.env.VITE_API_BASE_URL;

const { user: currentUser } = useContext(AuthContext);
 // to store latest audio blob

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      recordedAudioBlob.current = audioBlob;
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      audioChunks.current = [];
      handleUpload(audioBlob); // ✅ send to backend
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleUpload = async (blobOrFile) => {
    const formData = new FormData();
    formData.append('audio', blobOrFile);

    try {
      setLoading(true);
      setTranscription('');
      const res = await axios.post(`${API_BASE_URL}/api/note/transcribe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTranscription(res.data.transcription || 'No transcription received.');
    } catch (err) {
      console.error(err);
      setTranscription('Error occurred during transcription.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
  if (!transcription) {
    alert('No transcription available to save.');
    return;
  }

    if (!currentUser) {
    alert('You must be logged in to save notes.');
    return;
  }

  const noteTitle = title.trim() === '' ? 'Untitled Note' : title;

  try {
    // Send to backend or log to console
    const noteData = await axios.post(`${API_BASE_URL}/api/note/save-note`, {
      user_id: currentUser?.id,           // Get from Supabase Auth
      title: noteTitle,
      transcription,

    });



    alert('Note saved successfully!');
    setTitle('');
    setTranscription('');
    setAudioURL('');
  } catch (err) {
    console.error(err);
    alert('Failed to save note.');
  }
};


return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
    <div className="max-w-md mx-auto mt-10 bg-gradient-to-tr from-[#1e293b] to-[#334155] shadow-2xl rounded-2xl p-6 border border-gray-600">

      <input
        type="text"
        placeholder="Enter your note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-md bg-slate-800 text-white border border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {transcription && (
        <div className="my-4 p-4 bg-slate-800 border border-slate-600 rounded-lg text-slate-200">
          <h3 className="text-md font-semibold mb-1 text-indigo-300">Transcription:</h3>
          <p>{transcription}</p>
          <button
            onClick={handleSaveNote}
            className="px-4 py-2 mt-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-150 ease-in-out shadow hover:scale-105"
          >
            Save
          </button>
        </div>
      )}

      {loading && (
        <p className="text-indigo-300 font-medium text-sm mb-3">Processing audio...</p>
      )}

      <div className="flex justify-end space-x-3">
        {/* Upload Button */}
        <button
          onClick={() => document.getElementById('fileInput').click()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150 ease-in-out shadow-lg hover:scale-105 hover:shadow-blue-400/50"
        >
          Upload
        </button>
        <input
          type="file"
          id="fileInput"
          accept="audio/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setAudioURL(url);
              handleUpload(file);
            }
          }}
        />

        {/* Speak / Stop Button */}
        <button
          className={`px-4 py-2 ${
            isRecording
              ? 'bg-gray-600 hover:bg-gray-700'
              : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/50'
          } text-white font-semibold rounded-lg transition duration-150 ease-in-out shadow-lg hover:scale-105`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? 'Stop Recording' : 'Speak'}
        </button>
      </div>

      {audioURL && (
        <audio controls src={audioURL} className="mt-4 w-full rounded-md overflow-hidden" />
      )}
    </div>
  </div>
);


};

export default CreateNote;
