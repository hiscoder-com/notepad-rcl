import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Blocks from 'editorjs-blocks-react-renderer';

function ListOfNotes({
  notes,
  setNotes,
  removeNote,
  setNoteId,
  classes,
  delBtnChildren,
  editBtnChildren,
  isShowDate,
  isShowText,
  isShowDelBtn,
  dateOptions,
  readOnly,
}) {
  const [currentNote, setCurrentNote] = useState(null);
  const [_, setShowIcon] = useState(false);

  return (
    <div className={classes.wrapper}>
      {notes.map((el) => (
        <div
          key={el.id}
          className={classes.item}
          onClick={() => setNoteId(el.id)}
          aria-hidden="true"
        >
          <div className="flex flex-row">
            <div
              contentEditable={!readOnly}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                setCurrentNote((prev) => ({ ...prev, title: e.target.innerText }));
                setTimeout(() => {
                  setShowIcon(false);
                  setCurrentNote(null);
                }, 250);
              }}
              className={classes.title}
              onClick={(e) => {
                e.stopPropagation();
                setTimeout(() => {
                  setShowIcon(true);
                  const note = notes.find((element) => element.id === el.id);
                  setCurrentNote(note);
                }, 100);
              }}
              aria-hidden="true"
            >
              {el.title}
            </div>
            {!readOnly && el.id === currentNote?.id && (
              <button
                className={classes.editBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setNotes((prev) => {
                    const array = prev.filter((el) => el.id !== currentNote?.id);
                    array.unshift(currentNote);
                    return array;
                  });
                }}
              >
                {editBtnChildren}
              </button>
            )}
          </div>
          {isShowText && (
            <div className={classes.text}>
              <Blocks data={el.data} />
            </div>
          )}

          {isShowDelBtn && (
            <button
              className={classes.delBtn}
              onClick={(e) => {
                e.stopPropagation();
                removeNote(el.id);
              }}
            >
              {delBtnChildren}
            </button>
          )}
          {isShowDate && el.created_at && (
            <div className={classes.date}>
              {new Date(el.created_at).toLocaleString('ru', dateOptions)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

ListOfNotes.defaultProps = {
  notes: [],
  classes: {},
  dateOptions: {},
  isShowDate: false,
  isShowText: false,
  isShowDelBtn: false,
  delBtnName: '',
  title: 'untitled',
  setNoteId: () => {},
  readOnly: true,
};

ListOfNotes.propTypes = {
  classes: PropTypes.shape({
    /** class for wrapper */
    wrapper: PropTypes.string,
    /** class for redactor */
    redactor: PropTypes.string,
    /** class for title */
    title: PropTypes.string,
    /** class to preview each note */
    item: PropTypes.string,
    /** class for delBtn */
    delBtn: PropTypes.string,
    /** class for delBtnIcon */
    delBtnIcon: PropTypes.string,
    /** class for date */
    date: PropTypes.string,
    /** class for text */
    text: PropTypes.string,
  }),
  /** you can change the date representation (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) */
  dateOptions: PropTypes.object,
  /** delete button text */
  delBtnName: PropTypes.string,
  /** note title in preview */
  title: PropTypes.string,
  /** an array of existing notes. Required to display a list of notes */
  notes: PropTypes.array,
  /** pass the id of the selected note to the setter */
  setNoteId: PropTypes.func,
  /** if true, display note creation date during note preview */
  isShowDate: PropTypes.bool,
  /** if true, display note text during note preview */
  isShowText: PropTypes.bool,
};

export default ListOfNotes;
