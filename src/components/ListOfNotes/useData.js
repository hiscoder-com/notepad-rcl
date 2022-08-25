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
        const newLists = notes.filter((obj) => obj.key !== id);
        setNotes(newLists);
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  };

  return { notes, setNotes, removeItem };
}

export default useData;
