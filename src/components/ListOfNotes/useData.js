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
  const updateArray = () => {
    const newArr = [...notes];
    setNotes(newArr);
    console.log(newArr);

    return newArr;
  };
  // метод, который обновляет список заметок

  return { notes, updateArray };
}

export default useData;
