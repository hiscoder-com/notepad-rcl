/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';

function ListOfNotes({
  notesDb,
  listName,
  passIdToDel,
  addBtnName,
  delBtnName,
  addNote,
  setAddedNoteId,
  style,
}) {
  const DEFAULT_STYLE = {
    headerBlock: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginBottom: '20px',
    },
    header: { fontSize: '20px' },
    addBtn: { width: '54.5px', borderRadius: '12px' },
    listOfNotes: { width: '80%' },
    note: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    delBtn: { borderRadius: '5px' },
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 'full' }}>
      <div style={style?.headerBlock || DEFAULT_STYLE.headerBlock}>
        {/* <div style={style?.header || DEFAULT_STYLE.header}>{listName}</div> */}
        <button onClick={addNote} style={style?.addBtn || DEFAULT_STYLE.addBtn}>
          {addBtnName || 'Add'}
        </button>
      </div>
      <div style={style?.listOfNotes || DEFAULT_STYLE.listOfNotes}>
        {notesDb.map((el) => (
          <div key={el.holder} style={style?.note || DEFAULT_STYLE.note}>
            <div
              onClick={() => (
                setAddedNoteId(el.holder),
                console.log('el.holder of notes from LON.js:', el.holder)
              )}
              style={style?.title || DEFAULT_STYLE.title}
            >
              {el.title || 'New note'}
            </div>
            <div className="note-btn">
              <button
                style={style?.delBtn || DEFAULT_STYLE.delBtn}
                onClick={() => passIdToDel(el.holder)}
              >
                {delBtnName || 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ListOfNotes.defaultProps = {
  notesDb: [],
  listName: 'List of Notes',
};

ListOfNotes.propTypes = {
  /** add button name */
  addBtnName: PropTypes.string,
  /** Receives the key at the entrance  */
  addNote: PropTypes.func,
  /** delete button name */
  delBtnName: PropTypes.string,
  /** array of existing notes */
  notesDb: PropTypes.array,
  /** note list title */
  listName: PropTypes.string,
  /** Receives the key at the entrance */
  passIdToDel: PropTypes.func,
  /** Receives the key at the entrance */
  setAddedNoteId: PropTypes.func,
  style: PropTypes.shape({
    /** style for add button */
    addBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for delete button */
    delBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for header block */
    headerBlockStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for list of notes */
    listOfNotes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for note */
    note: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

export default ListOfNotes;
