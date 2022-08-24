import localforage from 'localforage';
import { default as React, useState, useEffect } from 'react';

function useData(test = '') {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const arr = [];
    localforage
      .iterate(function (value, key) {
        const obj = { key, value };
        arr.push(obj);
      })
      .then(function () {
        test ? setNotes(arr.filter(({ key }) => key !== test)) : setNotes(arr);

        // setNotes(arr.filter(({ key }) => key !== 'editorjs'));
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  // console.log('notes: ', notes);

  return notes;
}

export default useData;
