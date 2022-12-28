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
  saveBtnChildren,
  isShowDate,
  isShowText,
  isShowDelBtn,
  dateOptions,
}) {
  const [currentNote, setCurrentNote] = useState(null);
  const [isShownEditBtn, setIsShownEditBtn] = useState(false);
  const [titleIsEditable, setTitleIsEditable] = useState(false);
  const [editableTitle, setEditableTitle] = useState('');

  return (
    <div className={classes.wrapper}>
      {notes.map((el) => (
        <div
          key={el.id}
          className={classes.item}
          onClick={() => setNoteId(el.id)}
          aria-hidden="true"
        >
          {titleIsEditable ? (
            <div className="flex flex-row">
              {el.id === currentNote?.id ? (
                <>
                  <input
                    type="text"
                    placeholder={el.title}
                    value={editableTitle}
                    onBlur={(e) => {
                      setCurrentNote((prev) => ({ ...prev, title: e.target.value }));
                    }}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    className={classes.title}
                    onClick={(e) => {
                      e.stopPropagation();
                      const note = notes.find((element) => element.id === el.id);
                      setCurrentNote(note);
                      setEditableTitle(el.title);
                    }}
                  />
                  <button
                    className={classes.saveBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTitleIsEditable(false);
                      setNotes((prev) => {
                        const array = prev.filter((el) => el.id !== currentNote?.id);
                        array.unshift(currentNote);
                        return array;
                      });
                      setEditableTitle('');
                    }}
                  >
                    {saveBtnChildren}
                  </button>
                </>
              ) : (
                <div className={classes.title} aria-hidden="true">
                  {el.title}
                </div>
              )}
            </div>
          ) : (
            <div
              onMouseEnter={() => {
                const note = notes.find((element) => element.id === el.id);
                setCurrentNote(note);
                setTimeout(() => {
                  setIsShownEditBtn(true);
                }, 500);
              }}
              onMouseLeave={() => {
                setIsShownEditBtn(false);
                setCurrentNote(null);
              }}
              className="flex flex-row"
            >
              <div className={classes.title} aria-hidden="true">
                {el.title}
              </div>

              {isShownEditBtn && el.id === currentNote?.id && (
                <button
                  className={classes.editBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTitleIsEditable(true);
                  }}
                >
                  {editBtnChildren}
                </button>
              )}
            </div>
          )}

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
  classes: {},
  notes: [],
  setNotes: () => {},
  removeNote: (id) => {},
  setNoteId: () => {},
  editBtnChildren: [],
  saveBtnChildren: {},
  delBtnChildren: [],
  dateOptions: {},
  isShowDate: false,
  isShowText: false,
  isShowDelBtn: false,
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
    /** class for editBtn */
    editBtn: PropTypes.string,
    /** class for saveBtn */
    saveBtn: PropTypes.string,
    /** class for delBtnIcon */
    delBtnIcon: PropTypes.string,
    /** class for date */
    date: PropTypes.string,
    /** class for text */
    text: PropTypes.string,
  }),
  /** you can change the date representation (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) */
  dateOptions: PropTypes.object,
  /** an array of existing notes. Required to display a list of notes */
  notes: PropTypes.array,
  /** a function that is used to update the notes state */
  setNotes: PropTypes.func,
  /** the function that is used to delete the note. Accepts the id of the note to be deleted */
  removeNote: PropTypes.func,
  /** pass the id of the selected note to the setter */
  setNoteId: PropTypes.func,
  /** if true, display note creation date during note preview */
  isShowDate: PropTypes.bool,
  /** if true, display note text during note preview */
  isShowText: PropTypes.bool,
  /** if true, then display the delete button */
  isShowDelBtn: PropTypes.bool,
  /** delete note button */
  delBtnChildren: PropTypes.object,
  /** title edit button */
  editBtnChildren: PropTypes.object,
  /** save note button */
  saveBtnChildren: PropTypes.object,
};

export default ListOfNotes;
