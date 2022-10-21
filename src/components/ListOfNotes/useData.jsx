import React from 'react';
import PropTypes from 'prop-types';

export default function useData() {
  return <></>;
}

useData.defaultProps = {
  notes: [],
  removeNote: (id) => {},
  addNote: () => {},
  dBNameRegistration: (name) => {},
  noteRequest: (id) => {},
  saveNote: (id, note) => {},
};

useData.propTypes = {
  /** an array of existing notes. Required to display a list of notes */
  notes: PropTypes.array,
  /** gets the id of the note to be deleted as input */
  removeNote: PropTypes.func,
  /** method for getting notes from the database. We pass the id of the note, we get the object with the note */
  noteRequest: PropTypes.func,
  /** note saving method. The function saves the annotation using localforage. We pass in the id to get the note from localforage and pass the note itself to save it. */
  saveNote: PropTypes.func,
  /** pass a name for your DB */
  dBNameRegistration: PropTypes.func,
  /** method for adding a new note to the database. Creates an empty note and saves to the database  */
  addNote: PropTypes.func,
};
