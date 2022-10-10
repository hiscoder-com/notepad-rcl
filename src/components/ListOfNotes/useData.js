import { default as React, useState, useEffect } from 'react';

import localforage from 'localforage';

/**
 *
 * @param {*} test
 * @returns
 */

function useData() {
  const [notes, setNotes] = useState([]); // Array with notes

  useEffect(() => {
    const arr = [];
    localforage
      .iterate(function (value, key) {
        const obj = { key, value };
        arr.push(obj);
      })
      .then(function () {
        setNotes(arr);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  // Assign a name to the database
  const dBNameRegistration = (name) => {
    localforage.config({
      name,
    });
  };

  // Getting a note from localforage сделать асинхронной
  const getNote = (id) => {
    const result = localforage.getItem(id);
    return result;
  };

  const saveNote = (key, title, note) => {
    localforage.getItem(key).then(function (value) {
      value
        ? localforage.setItem(key, {
            ...value,
            title: title || 'New note',
            data: note,
          })
        : localforage.setItem(key, {
            title: title,
            data: note,
            created: new Date(),
            parent: null,
            isFolder: false,
          });
    });
  };

  // Removing a note from the list
  const removeNote = (id) => {
    localforage
      .removeItem(id)
      .then(function () {
        // Run this code once the key has been removed.
        setNotes((prev) => prev.filter((obj) => obj.key !== id));
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  };

  // Adding a note to the list
  const addNote = () => {
    const id = ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9);
    localforage
      .setItem(id, {
        title: 'New lf-note', // Переместить в note?
        note: {},
        created: new Date(),
        parent: null,
        isFolder: false,
      })
      .then((note) => setNotes((prev) => [...prev, { key: id, value: note }]));
  };

  return { notes, removeNote, addNote, dBNameRegistration, getNote, saveNote };
}

export default useData;
