/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';

function ListOfNotes({ data }) {
  return (
    <div className="list-of-notes">
      <div className="header">
        <h1>List of Notes</h1>
      </div>
      <div className="notes">
        {data.map(({ key }) => (
          <div key={key} className="note">
            <div className="note-title">{key}</div>
            <div className="note-btn">
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfNotes;
