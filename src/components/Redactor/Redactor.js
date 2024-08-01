import { default as React, useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { createReactEditorJS } from 'react-editor-js';

function Redactor({
  initId,
  activeNote,
  placeholder,
  setActiveNote,
  editorTools,
  classes = {},
  isRtl = false,
  readOnly = false,
  disableTitle = false,
  isSelectableTitle = false,
  emptyTitle = 'Empty Title',
}) {
  const titleRef = useRef(null);

  const ReactEditorJS = createReactEditorJS();

  const [title, setTitle] = useState(activeNote?.title || emptyTitle);

  useEffect(() => {
    if (activeNote?.title) {
      setTitle(activeNote.title);
    }
  }, [activeNote]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    const updatedTitle = title.trim() || emptyTitle;
    if (typeof setActiveNote === 'function') {
      setActiveNote((prev) => ({ ...prev, title: updatedTitle }));
    }
    setTitle(updatedTitle);
  };

  const handleEditorChange = async (e) => {
    const content = await e.saver.save();
    if (typeof setActiveNote === 'function') {
      setActiveNote((prev) => ({ ...prev, data: content }));
    }
  };

  const selectTitle = () => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(titleRef.current);
    selection.removeAllRanges();
    selection.addRange(range);
  };
  const direction = isRtl ? 'rtl' : 'ltr';

  return (
    <div className={classes.wrapper}>
      {!disableTitle && (
        <input
          className={classes.title}
          type="text"
          placeholder="Title"
          maxLength="256"
          readOnly={readOnly}
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onClick={() => isSelectableTitle && selectTitle()}
          ref={titleRef}
          dir={direction}
        />
      )}
      <div className={classes.redactor} dir={direction}>
        <ReactEditorJS
          onChange={handleEditorChange}
          autofocus={false}
          defaultValue={activeNote?.data}
          placeholder={placeholder || 'Let`s write an awesome note!'}
          readOnly={readOnly}
          tools={editorTools}
          minHeight={0}
          logLevel="ERROR"
          holder={initId}
        />
      </div>
    </div>
  );
}

Redactor.propTypes = {
  classes: PropTypes.shape({
    /** Class for wrapper */
    wrapper: PropTypes.string,
    /** Class for redactor */
    redactor: PropTypes.string,
    /** Class for title */
    title: PropTypes.string,
  }),
  /** Write a new property for the Tools object and pass it to the Editor via the addTools variable */
  editorTools: PropTypes.object,
  /** Note ID. To run Redactor, you need to assign an ID to the note */
  initId: PropTypes.string,
  /** Note Placeholder */
  placeholder: PropTypes.string,
  /** An object that contains all the properties of the note */
  activeNote: PropTypes.object,
  /** Pass a new note object to the setter */
  setActiveNote: PropTypes.func,
  /** If true, then the content is read-only */
  readOnly: PropTypes.bool,
  /** If true, then the title is not displayed */
  disableTitle: PropTypes.bool,
  /** Sets the title value if the title is empty */
  emptyTitle: PropTypes.string,
  /** If true, then the title selected by click */
  isSelectableTitle: PropTypes.bool,
  /** if true, display note, title in rtl direction */
  isRtl: PropTypes.bool,
};

export default Redactor;
