/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';

import Blocks from 'editorjs-blocks-react-renderer';

function ListOfNotes({
  notes,
  removeNote,
  delBtnName,
  setNoteId,
  classes = {},
  delBtnIcon = '',
  isShowDate = false,
  isShowText = false,
}) {
  return (
    <div className={classes.wrapper}>
      {notes
        .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        .map((el) => (
          <div key={el.id} className={classes.item} onClick={() => setNoteId(el.id)}>
            <div className={classes.title}>{el.title || 'untitled'}</div>
            {isShowText && (
              <div className={classes.text}>
                <Blocks data={el.data} />
              </div>
            )}

            <button
              className={classes.delBtn}
              onClick={(e) => {
                e.stopPropagation();
                removeNote(el.id);
              }}
            >
              {delBtnName && (
                <div className={classes.delBtnText}>{delBtnName || 'Delete'}</div>
              )}
              {delBtnIcon && <div className={classes.delBtnIcon}>{delBtnIcon}</div>}
            </button>
            {isShowDate && el.created_at && (
              <div className={classes.date}>
                {el.created_at.getDay() +
                  '.' +
                  el.created_at.getMonth() +
                  '.' +
                  el.created_at.getFullYear()}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

ListOfNotes.defaultProps = {
  notes: [],
};

ListOfNotes.propTypes = {
  /** add button name */
  addBtnName: PropTypes.string,
  /** Receives the id at the entrance  */
  addNote: PropTypes.func,
  /** delete button name */
  delBtnName: PropTypes.string,
  /** array of existing notes */
  notes: PropTypes.array,
  /** Receives the id at the entrance */
  removeNote: PropTypes.func,
  /** Receives the id at the entrance */
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
