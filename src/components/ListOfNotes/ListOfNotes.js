import React from 'react';
import PropTypes from 'prop-types';
import Blocks from 'editorjs-blocks-react-renderer';

function ListOfNotes({
  notes,
  removeNote,
  setNoteId,
  classes,
  delBtnChildren,
  isShowDate,
  isShowText,
  isShowDelBtn,
  dateOptions,
}) {
  const handleClick = (id) => {
    setNoteId(id);
  };

  const handleRemoveNote = (e, id) => {
    e.stopPropagation();
    removeNote(id);
  };

  return (
    <div className={classes.wrapper}>
      {notes.map((el) => (
        <div key={el.id} className={classes.item} onClick={() => handleClick(el.id)}>
          <div className={classes.title}>{el.title}</div>
          {isShowText && (
            <div className={classes.text}>
              <Blocks data={el.data} />
            </div>
          )}

          {isShowDelBtn && (
            <button
              className={classes.delBtn}
              onClick={(e) => handleRemoveNote(e, el.id)}
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
  title: 'untitled',
  delBtnChildren: 'Delete',
  setNoteId: () => {},
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
  /** note title in preview */
  title: PropTypes.string,
  /** an array of existing notes. Required to display a list of notes */
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      data: PropTypes.object,
      created_at: PropTypes.string,
    })
  ),
  /** function to remove a note */
  removeNote: PropTypes.func,
  /** pass the id of the selected note to the setter */
  setNoteId: PropTypes.func,
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
