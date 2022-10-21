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
  /** pass a name for your DB localforage */
  noteRequest: PropTypes.func,
  /** the function saves the note in localforage. We pass id to get a note from localforage and pass the note itself to save it */
  saveNote: PropTypes.func,
  /** pass a name for your DB localforage */
  dBNameRegistration: PropTypes.func,
  /** receives the id at the entrance  */
  addNote: PropTypes.func,
};
