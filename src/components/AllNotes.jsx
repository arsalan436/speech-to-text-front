import React, { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../../utils/NotesContext';
import { AuthContext } from '../../utils/AuthContext';

const AllNotes = () => {
  const { user } = useContext(AuthContext);
  const { notes, setNotes, loading, fetchNotes, updateNote, deleteNote } = useContext(NotesContext);

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedAudioUrl, setEditedAudioUrl] = useState('');
  const [editedTranscript, setEditedTranscript] = useState('');

  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  const startEdit = (note) => {
    setEditingNoteId(note.id);
    setEditedAudioUrl(note.audio_url || '');
    setEditedTranscript(note.transcript || '');
  };

  const handleEditSubmit = async () => {
    const updatedData = {
      audio_url: editedAudioUrl,
      transcript: editedTranscript,
    };

    try {
      await updateNote(editingNoteId, updatedData);

      // Local UI update
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNoteId ? { ...note, ...updatedData } : note
        )
      );

      setEditingNoteId(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDelete = async (noteId) => {
    const confirm = window.confirm('Are you sure you want to delete this note?');
    if (!confirm) return;

    try {
      await deleteNote(noteId);

      // Local UI update
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading your notes...</p>;

return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-10 px-4 sm:px-6 lg:px-8">
    {notes.length === 0 ? (
      <p className="text-center mt-10 text-slate-400 text-lg font-medium">No notes found.</p>
    ) : (
      <div className="grid gap-8 max-w-3xl mx-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-gradient-to-tr from-[#1e293b] to-[#334155] shadow-2xl rounded-2xl p-6 border border-gray-600 transition-transform duration-200 hover:scale-[1.01]"
          >
            <h2 className="text-sm sm:text-base font-semibold text-indigo-300 break-all mb-3">
              {note.audio_url}
            </h2>
            <p className="text-slate-300 whitespace-pre-line mb-4">{note.transcript}</p>

            {editingNoteId === note.id ? (
              <div className="space-y-3">
                <input
                  className="w-full bg-slate-800 border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 text-white"
                  value={editedAudioUrl}
                  onChange={(e) => setEditedAudioUrl(e.target.value)}
                  placeholder="Edit audio URL"
                />
                <textarea
                  className="w-full bg-slate-800 border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 text-white"
                  rows="4"
                  value={editedTranscript}
                  onChange={(e) => setEditedTranscript(e.target.value)}
                  placeholder="Edit transcript"
                />
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-150 ease-in-out hover:scale-105"
                    onClick={handleEditSubmit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-150 ease-in-out hover:scale-105"
                    onClick={() => setEditingNoteId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => startEdit(note)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-blue-400/50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-red-500/50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);




};

export default AllNotes;
