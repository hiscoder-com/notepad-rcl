import React, { useEffect, useState } from 'react';
import localforage from 'localforage';

function ListOfNotes({ data, listName, onRemove, passIdInMD }) {
  const passId = (id) => {
    passIdInMD(id);
  };
  const removeItem = (id) => {
    localforage
      .removeItem(id)
      .then(function () {
        // Run this code once the key has been removed.
        console.log('Key is cleared!');
        passId(id);
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  };
  // console.log(data);

  return (
    <div
      className="list-of-notes"
      style={{ display: 'flex', flexDirection: 'column', width: '500px' }}
    >
      <div className="header">
        <h1>{listName}</h1>
      </div>
      <div className="notes" style={{ width: '300px' }}>
        {data.map(({ key }) => (
          <div
            key={key}
            className="note"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <div className="note-title">{key}</div>
            <div className="note-btn">
              <button onClick={() => removeItem(key)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfNotes;
