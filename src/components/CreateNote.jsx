import React, { useRef, useState } from 'react'
import Navbar from './Navbar'

const CreateNote = () => {

    const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [title, setTitle] = useState('');
  const [transcription, setTranscription] = useState(''); // ⬅️ for showing transcript
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      audioChunks.current = [];
      // 🔴 Dummy transcript for now (you’ll replace with API response)
      setTranscription("Transcription will appear here after processing...");
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div>
        <Navbar/>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      {/* <h2 className="text-xl font-semibold mb-2">My Note Title</h2> */}
      <input
          type="text"
          placeholder="Enter your note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      <p className="text-gray-700 mb-4">
        
      </p>
      {transcription && (
            <div className="my-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
              <h3 className="text-md font-semibold mb-1">Transcription:</h3>
              <p>{transcription}</p>
            </div>
          )}

      <div className="flex justify-end space-x-3">
        <button onClick={() => document.getElementById('fileInput').click()} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition">
          Upload Audo File
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
                // 🔴 Dummy text — replace this with transcription logic
                setTranscription("Transcript for uploaded audio will go here.");
              }
            }}
          />

        <button
            className={`px-4 py-2 ${isRecording ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'} text-white font-medium rounded-lg transition`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? 'Stop Recording' : 'Speak'}
          </button>

          {audioURL && (
            <audio controls src={audioURL} className="mt-4" />
          )}
                    {/* 📝 Transcription Display Area */}
          
      </div>
    </div>
    </div>
  )
}

export default CreateNote
