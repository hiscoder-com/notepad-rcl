import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Blocks from 'editorjs-blocks-react-renderer';
import { calculateRtlDirection } from '../helpers';

function ListOfNotes({
  notes,
  setNoteId,
  removeNote,
  dateOptions,
  editNoteTitle,
  delBtnChildren,
  classes = {},
  style = {},
  isShowDelBtn = false,
  isShowDate = false,
  isShowText = false,
}) {
  const [editingTitle, setEditingTitle] = useState(null);

  const handleClick = (id) => {
    if (typeof setNoteId === 'function') {
      setNoteId(id);
    }
  };

  const handleRemoveNote = (e, id) => {
    e.stopPropagation();
    if (typeof removeNote === 'function') {
      removeNote(id);
    }
  };

  const handleTitleClick = (e, id) => {
    e.stopPropagation();
    if (!editNoteTitle && typeof setNoteId === 'function') {
      setNoteId(id);
    }
  };

  return (
    <div className={classes?.wrapper} style={style?.wrapper}>
      {notes?.map((note) => {
        const titleDirection = calculateRtlDirection(note.title);
        const contentDirection = calculateRtlDirection(
          note?.data ? note.data.blocks.map((block) => block.data.text).join(' ') : ''
        );
        return (
          <div
            key={note.id}
            className={classes?.item}
            style={style?.item}
            onClick={() => handleClick(note.id)}
          >
            <div
              className={classes?.titleBlock}
              style={style?.titleBlock}
              onClick={(e) => handleTitleClick(e, note.id)}
              dir={titleDirection}
            >
              {editNoteTitle && editingTitle === note.id ? (
                <input
                  autoFocus
                  type="text"
                  defaultValue={note.title}
                  style={style?.renameInput}
                  className={classes?.renameInput}
                  onBlur={() => setEditingTitle(null)}
                  onFocus={(e) => e.currentTarget.select()}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setEditingTitle(null);
                    if (e.key === 'Enter') {
                      editNoteTitle(note.id, e.target.value);
                      setEditingTitle(null);
                    }
                  }}
                />
              ) : (
                <div
                  className={classes?.title}
                  style={style?.title}
                  onDoubleClick={() => setEditingTitle(note.id)}
                >
                  {note.title}
                </div>
              )}
              {isShowDelBtn && (
                <button
                  className={classes?.delBtn}
                  style={style?.delBtn}
                  onClick={(e) => handleRemoveNote(e, note.id)}
                >
                  {delBtnChildren || 'Delete'}
                </button>
              )}
            </div>

            {isShowText && (
              <div className={classes?.text} style={style?.text} dir={contentDirection}>
                <Blocks data={note.data} />
              </div>
            )}

            {isShowDate && note.created_at && (
              <div className={classes?.date} style={style?.date}>
                {new Date(note.created_at).toLocaleString('ru', dateOptions)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

ListOfNotes.propTypes = {
  /** component styles */
  style: PropTypes.shape({
    /** style for wrapper */
    wrapper: PropTypes.object,
    /** style to preview each note */
    item: PropTypes.object,
    /** style for titleBlock */
    titleBlock: PropTypes.object,
    /** style for title */
    title: PropTypes.object,
    /** style for the input field when renaming */
    renameInput: PropTypes.object,
    /** style for text */
    text: PropTypes.object,
    /** style for delBtn */
    delBtn: PropTypes.object,
    /** style for date */
    date: PropTypes.object,
  }),
  /** function to edit the title of a note */
  editNoteTitle: PropTypes.func,
  classes: PropTypes.shape({
    /** class for wrapper */
    wrapper: PropTypes.string,
    /** class for titleBlock */
    titleBlock: PropTypes.string,
    /** class for title */
    title: PropTypes.string,
    /** class to preview each note */
    item: PropTypes.string,
    /** class for delBtn */
    delBtn: PropTypes.string,
    /** class for date */
    date: PropTypes.string,
    /** class for text */
    text: PropTypes.string,
  }),
  /** you can change the date representation (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) */
  dateOptions: PropTypes.object,
  /** an array of existing notes. Required to display a list of notes */
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      data: PropTypes.object,
      created_at: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  /** function to remove a note */
  removeNote: PropTypes.func,
  /** pass the id of the selected note to the setter */
  setNoteId: PropTypes.func.isRequired,
  /** if true, display delete button for each note */
  isShowDelBtn: PropTypes.bool,
  /** content of the delete button */
  delBtnChildren: PropTypes.node,
  /** if true, display note creation date during note preview */
  isShowDate: PropTypes.bool,
  /** if true, display note text during note preview */
  isShowText: PropTypes.bool,
};
export default ListOfNotes;
