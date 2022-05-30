import React, { useEffect, useState } from 'react';
import localforage from 'localforage';

function NoteList({}) {
  const [state, setState] = useState(0);

  useEffect(() => {
    localforage.setItem('test', state).then(() => {
      console.log('used localForage');
    });
  }, [state]);
  useEffect(() => {
    localforage.getItem('test').then((val) => {
      if (val !== null) {
        setState(val);
      } else {
        localforage.setItem('test', state);
      }
    });
  }, []);

  return (
    <>
      <p>{state}</p>
      <button
        onClick={() => {
          setState(Math.floor(Math.random() * 10));
        }}
      >
        click to get random number
      </button>
    </>
  );
}
export default NoteList;
