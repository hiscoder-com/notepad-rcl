import localforage from 'localforage';
import { default as React, useState, useEffect } from 'react';
/**
 *
 * @param {*} test
 * @returns
 */
function useData() {
  const [notes, setNotes] = useState([]);
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

  const removeItem = (id) => {
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
      .then((value) => setNotes((prev) => [...prev, { key: holder, value }]));
  };

  return { notes, setNotes, removeItem, addNote };
}

export default useData;
