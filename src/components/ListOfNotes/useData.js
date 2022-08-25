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

  const updateNotes = (id) => {
    const newLists = notes.filter((obj) => obj.key !== id);
    setNotes(newLists);
  };

  return { notes, setNotes, updateNotes };
}

export default useData;
