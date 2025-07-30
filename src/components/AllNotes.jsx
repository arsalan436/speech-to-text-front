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
    <div>
      {notes.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">No notes found.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">{note.audio_url}</h2>
            <p className="text-gray-700 mb-4">{note.transcript}</p>

            {editingNoteId === note.id ? (
              <div className="mt-4 space-y-2">
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={editedAudioUrl}
                  onChange={(e) => setEditedAudioUrl(e.target.value)}
                  placeholder="Edit audio URL"
                />
                <textarea
                  className="w-full border px-3 py-2 rounded"
                  rows="4"
                  value={editedTranscript}
                  onChange={(e) => setEditedTranscript(e.target.value)}
                  placeholder="Edit transcript"
                />
                <div className="flex space-x-3 justify-end">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleEditSubmit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setEditingNoteId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                  onClick={() => startEdit(note)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllNotes;
