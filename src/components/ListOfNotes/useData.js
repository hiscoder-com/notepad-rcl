import { useState, useEffect } from 'react';

import localforage from 'localforage';

/**
 *
 * @param {*} test
 * @returns
 */

function useData() {
  const [notes, setNotes] = useState([]); // Array with notes
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

  // Getting a note from localforage сделать асинхронной
  const noteRequest = async (id) => {
    const result = await localforage.getItem(id);
    return result;
  };

  const saveNote = async (id, note) => {
    setIsSaving(true);
    await localforage.getItem(id).then(function (value) {
      value
        ? localforage.setItem(id, {
            ...note,
          })
        : localforage.setItem(id, {
            id,
            title,
            data,
            created: new Date(),
            parent: null,
            isFolder: false,
          });
      setIsSaving(false);
    });
  };

  // Removing a note from the list
  const removeNote = (id) => {
    localforage
      .removeItem(id)
      .then(function () {
        // Run this code once the id has been removed.
        setNotes((prev) => prev.filter((obj) => obj.id !== id));
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  };

  // Adding a note to the list
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
        },
        created: new Date(),
        parent: null,
        isFolder: false,
      })
      .then((note) => setNotes((prev) => [...prev, note]));
  };

  return { notes, removeNote, addNote, dBNameRegistration, noteRequest, saveNote };
}

export default useData;
