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
  // const [currentUser, setCurrentUser] = useState(null);

// useEffect(() => {
//   const getUser = async () => {
//     const { data: { user }, error } = await supabase.auth.getUser();
//     if (user && !error) {
//       setCurrentUser(user);
//     }
//   };

//   getUser();
// }, []);

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
      const res = await axios.post('http://localhost:5000/api/note/transcribe', formData, {
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
    const noteData = await axios.post('http://localhost:5000/api/note/save-note', {
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
    <div>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <input
          type="text"
          placeholder="Enter your note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {transcription && (
          <div className="my-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
            <h3 className="text-md font-semibold mb-1">Transcription:</h3>
            <p>{transcription}</p>
            <button onClick={handleSaveNote} className="px-4 py-2 mt-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition">Save</button>
          </div>
        )}

        {loading && (
          <p className="text-blue-600 font-medium text-sm mb-3">Processing audio...</p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => document.getElementById('fileInput').click()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
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
                handleUpload(file); // ✅ send uploaded file
              }
            }}
          />

          <button
            className={`px-4 py-2 ${isRecording ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'} text-white font-medium rounded-lg transition`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? 'Stop Recording' : 'Speak'}
          </button>
        </div>

        {audioURL && (
          <audio controls src={audioURL} className="mt-4 w-full" />
        )}
      </div>
    </div>
  );
};

export default CreateNote;
