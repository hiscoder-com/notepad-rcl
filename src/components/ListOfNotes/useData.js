import { useState, useEffect } from 'react';

import localforage from 'localforage';

/**
 *
 * @param {*} test
 * @returns
 */

function useData() {
  const [notes, setNotes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const iterateNotes = async () => {
      const arr = [];
      await localforage
        .iterate(function (value, id) {
          if (id.includes('note')) {
            arr.push(value);
          }
        })
        .then(function () {
          setNotes(arr);
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    iterateNotes();
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
    await localforage.getItem(id).then(function (value) {
      value
        ? localforage.setItem(id, {
            ...note,
          })
        : localforage.setItem(id, {
            id: note.id,
            title,
            data,
            created_at: new Date(),
            parent_id: null,
            isFolder: false,
          });
      setIsSaving(false);
    });
  };

  const removeNote = (id) => {
    localforage
      .removeItem(id)
      .then(function () {
        setNotes((prev) => prev.filter((obj) => obj.id !== id));
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const addNote = () => {
    const id =
      'note' + ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9);
    localforage
      .setItem(id, {
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
      })
      .then((note) => setNotes((prev) => [...prev, note]));
  };

  return { notes, removeNote, addNote, dBNameRegistration, noteRequest, saveNote };
}

export default useData;
