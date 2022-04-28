/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function NoteList() {
  const [notesArray, setNotesArray] = useState(
    localStorage.notesArray ? JSON.parse(localStorage.notesArray) : []
  );

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'Untitled Note',
      body: '',
      lastModified: Date.now(),
    };

    setNotesArray([newNote, ...notesArray]);
  };

  const deleteNote = (noteId) => {
    setNotesArray(notesArray.filter(({ id }) => id !== noteId));
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
        {notesArray.map(({ id, title, body, lastModified }) => (
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
              <strong>{title}</strong>
              <button
                onClick={() => deleteNote(id)}
                style={{
                  color: 'red',
                }}
              >
                Delete
              </button>
            </div>
            <small className="note-meta">
              Last modified{' '}
              {new Date(lastModified).toLocaleDateString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
export default NoteList;
