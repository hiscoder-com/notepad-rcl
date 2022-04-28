/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import uuid from 'react-uuid';

function NoteList() {
  const [notesArray, setNotesArray] = useState(
    localStorage.notesArray ? JSON.parse(localStorage.notesArray) : []
  );
  const addNote = () => {
    const newNote = {
      id: uuid(),
      title: 'Untitled Note',
      body: '',
      lastModified: Date.now(),
    };

    setNotesArray([newNote, ...notesArray]);
  };
  return (
    <div className="app-sidebar">
      <div
        className="app-sidebar-header"
        style={{ display: 'flex', justifyContent: 'space-between', padding: '25px' }}
      >
        <h1>Notes</h1>
        <button
          onClick={addNote}
          style={{
            color: '#08c',
          }}
        >
          Add
        </button>
      </div>
      <div
        className="app-sidebar-notes"
        style={{
          height: 'calc(100vh - 78px)',
          overflowY: 'scroll',
        }}
      >
        {notesArray.map((note) => (
          <div
            className="app-sidebar-note"
            style={{
              padding: '25px',
              cursor: 'pointer',
            }}
          >
            <div
              className="sidebar-note-title"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <strong>title</strong>
              <button
                style={{
                  color: 'red',
                }}
              >
                Delete
              </button>
            </div>
            <small className="note-meta">
              Last modified{' '}
              {/* {new Date(lastModified).toLocaleDateString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            })} */}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
export default NoteList;
