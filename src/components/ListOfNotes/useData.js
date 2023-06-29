import { useState, useEffect } from 'react';

import localforage from 'localforage';

function useData() {
  const [notes, setNotes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const arr = [];
      await localforage.iterate((value, id) => {
        if (id.includes('note')) {
          arr.push(value);
        }
      });
      setNotes(arr);
    };

    fetchNotes();
  }, [isSaving]);

  // Assign a name to the database
  const dBNameRegistration = (name) => {
    localforage.config({
      name,
    });
  };

  const noteRequest = async (id) => {
    const result = await localforage.getItem(id);
    return result;
  };

  const saveNote = async (id, note) => {
    setIsSaving(true);
    if (!note) {
      return;
    }
    const { title, data } = note;

    const existingNote = await localforage.getItem(id);
    if (existingNote) {
      await localforage.setItem(id, {
        ...note,
      });
    } else {
      await localforage.setItem(id, {
        id: note.id,
        title,
        data,
        created_at: new Date(),
        parent_id: null,
        isFolder: false,
      });
    }

    setIsSaving(false);
  };

  const removeNote = async (id) => {
    try {
      await localforage.removeItem(id);
      setNotes((prev) => prev.filter((obj) => obj.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const addNote = async () => {
    const id =
      'note' + ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9);
    const newNote = {
      id,
      title: 'New lf-note',
      data: {
        blocks: [
          {
            type: 'paragraph',
            data: {},
          },
        ],
        version: '2.25.0',
      },
      created_at: new Date(),
      parent_id: null,
      isFolder: false,
    };

    await localforage.setItem(id, newNote);
    setNotes((prev) => [...prev, newNote]);
  };

  return { notes, removeNote, addNote, dBNameRegistration, noteRequest, saveNote };
}

export default useData;
