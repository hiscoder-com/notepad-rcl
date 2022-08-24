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
  // console.log('notes: ', notes);

  return { notes, setNotes };
}

export default useData;
