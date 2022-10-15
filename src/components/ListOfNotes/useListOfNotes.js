import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

function useListOfNotes({ notesDb, noteId }) {
  const [notes, setNotes] = useState(notesDb);
  const [note, setNote] = useState(null);
  useEffect(() => {
    if (!noteId) {
      return;
    }
    const array = notes.find((el) => el.id === noteId);
    setNote(array);
  }, [noteId]);
  const addNote = () => {
    const newNote = {
      id: ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9),
      title: 'new note',
      data: {
        blocks: [
          {
            type: 'paragraph',
            data: {},
          },
        ],
        version: '2.8.1',
      },
    };

    setNotes((prev) => [...prev, newNote]);
  };
  const removeNote = (id) => {
    const newArray = notes.filter((el) => el.id !== id);
    setNotes(newArray);
  };
  return { note, notes, addNote, removeNote };
}

useListOfNotes.defaultProps = {};

useListOfNotes.propTypes = {};

export default useListOfNotes;
