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
  }, [notes]);

  const removeItem = (id) => {
    localforage
      .removeItem(id)
      .then(function () {
        // Run this code once the key has been removed.
        const newLists = notes.filter((obj) => obj.key !== id);
        setNotes(newLists);
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  };

  const addItem = () => {
    const holder = ('000000000' + Math.random().toString(36).substr(2, 9)).slice(-9);
    localforage
      .setItem(holder, {
        title: 'New note',
        data: {},
        created: new Date(),
        isParent: null,
        isFolder: false,
      })
      .then((value) => console.log('value:', value));
  };

  return { notes, setNotes, removeItem, addItem };
}

export default useData;
