import localforage from 'localforage';
import { default as React, useState, useEffect } from 'react';

function useGetList() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    localforage
      .iterate(function (value, key, iterationNumber) {
        setNotes((prev) => [
          ...prev,
          // вместо div собрать выводимый массив
        ]);
        console.log([key, value]);
      })
      .then(function () {
        console.log('Iteration has completed');
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  }, []);

  console.log('notes: ', notes);

  return notes;
}

export default useGetList;

// <div
//   onClick={() => console.log(value)}
//   aria-hidden="true"
//   key={key}
//   className="note"
// >
//   <div className="title-key">{key}</div>
//   <div className="body-value">{value.time}</div>
// </div>,
