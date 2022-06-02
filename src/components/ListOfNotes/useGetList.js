import localforage from 'localforage';
import { default as React, useState, useEffect } from 'react';

function useGetList() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const arr = [];

    localforage
      .iterate(function (value, key) {
        const obj = { key, value };
        console.log('obj:', obj);
        arr.push(obj);
        console.log('arr: ', arr);
      })
      .then(function () {
        setNotes(arr);
        console.log('Iteration has completed');
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  console.log('notes: ', notes);

  return notes;
}

export default useGetList;
