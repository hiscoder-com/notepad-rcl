import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { Editor } from '@texttree/notepad-rcl';

function SaveDataInLF({}) {
  const [data, setData] = useState(0);

  useEffect(() => {
    localforage.setItem('test', data).then(() => {
      console.log('used localForage');
    });
  }, [data]);
  useEffect(() => {
    localforage.getItem('test').then((val) => {
      if (val !== null) {
        setData(val);
      } else {
        localforage.setItem('test', data);
      }
    });
  }, []);

  return (
    <>
      <Editor />
      <button>click to save Data</button>
      {/* <p>{data}</p>
      <button
        onClick={() => {
          setData(Math.floor(Math.random() * 10));
        }}
      >
        click to get random number
      </button> */}
    </>
  );
}
export default SaveDataInLF;
