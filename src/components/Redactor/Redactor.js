import { default as React, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { createReactEditorJS } from 'react-editor-js';

function Redactor({
  classes,
  editorTools,
  placeholder,
  setActiveNote,
  disableTitle,
  activeNote,
  readOnly,
  initId,
}) {
  const ReactEditorJS = createReactEditorJS();

  const [title, setTitle] = useState(activeNote?.title || '');

  useEffect(() => {
    if (activeNote?.title) {
      setTitle(activeNote.title);
    }
  }, [activeNote]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.innerText;
    setActiveNote((prev) => ({ ...prev, title: newTitle }));
    setTitle(newTitle);
  };

  const handleEditorChange = async (e) => {
    const content = await e.saver.save();
    setActiveNote((prev) => ({ ...prev, data: content }));
  };

  return (
    <div className={classes.wrapper}>
      {!disableTitle && (
        <div
          className={classes.title}
          placeholder="Title"
          maxLength="256"
          contentEditable={!readOnly}
          suppressContentEditableWarning={true}
          onBlur={handleTitleChange}
        >
          {title}
        </div>
      )}
      <div className={classes.redactor}>
        <ReactEditorJS
          onChange={handleEditorChange}
          autofocus={false}
          defaultValue={activeNote?.data}
          placeholder={placeholder}
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

Redactor.defaultProps = {
  editorTools: {},
  initId: 'default_id',
  placeholder: 'Let`s write an awesome note!',
  activeNote: {},
  setActiveNote: () => {},
  classes: {},
  readOnly: false,
  disableTitle: false,
};

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
};

export default Redactor;
