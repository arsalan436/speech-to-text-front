import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchNotes = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/note/user-notes/${user.id}`);
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchNotes();
    }
  }, [user]);

  const updateNote = async (id, updatedData) => {
    try {
      // Local UI update
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, ...updatedData } : note
        )
      );

      await axios.put(`${API_BASE_URL}/api/note/update/${id}`, updatedData);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      // Local UI update
      setNotes((prev) => prev.filter((note) => note.id !== id));

      await axios.delete(`${API_BASE_URL}/api/note/delete/${id}`);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const addNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        fetchNotes,
        updateNote,
        deleteNote,
        setNotes, // optional, in case you need direct access
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
