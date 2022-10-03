import { default as React, useState, useEffect } from 'react';

import localforage from 'localforage';

/**
 *
 * @param {*} test
 * @returns
 */

function useData() {
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    const arr = [];
    localforage
      .iterate(function (value, key) {
        const obj = { key, value };
        arr.push(obj);
      })
      .then(function () {
        setNotesArray(arr);
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

  // Getting a note from localforage
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
        setNotesArray((prev) => prev.filter((obj) => obj.key !== id));
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  };

  // Adding a note to the list
  const addNote = () => {
    const holder = ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9);
    localforage
      .setItem(holder, {
        title: 'New note',
        data: {},
        created: new Date(),
        parent: null,
        isFolder: false,
      })
      .then((value) => setNotesArray((prev) => [...prev, { key: holder, value }]));
  };

  return { notesArray, removeNote, addNote, dBNameRegistration, getNote, saveNote };
}

export default useData;
