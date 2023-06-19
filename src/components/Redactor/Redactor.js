import { default as React, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { createReactEditorJS } from 'react-editor-js';

function Redactor({
  classes,
  editorTools,
  placeholder,
  setActiveNote,
  activeNote,
  readOnly,
  initId,
}) {
  const ReactEditorJS = createReactEditorJS();

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (activeNote && Object.keys(activeNote).includes('title')) {
      setTitle(activeNote.title);
    }
  }, [activeNote]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.parentBC}>{activeNote?.parentBC}</div>
      <div
        className={classes.title}
        placeholder="Title"
        maxLength="256"
        contentEditable={!readOnly}
        suppressContentEditableWarning={true}
        onBlur={(e) => {
          setActiveNote((prev) => ({ ...prev, title: e.target.innerText }));
          setTitle(e.target.innerText);
        }}
      >
        {title}
      </div>
      <div className={classes.redactor}>
        <ReactEditorJS
          onChange={async (e) => {
            const content = await e.saver.save();
            setActiveNote((prev) => ({ ...prev, data: content }));
          }}
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
};

Redactor.propTypes = {
  classes: PropTypes.shape({
    /** class for wrapper */
    wrapper: PropTypes.string,
    /** class for redactor */
    redactor: PropTypes.string,
    /** class for title */
    title: PropTypes.string,
  }),
  /** Write a new property for the Tools object and pass it to the Editor via the addTools variable */
  editorTools: PropTypes.object,
  /** note ID. To run Redactor, you need to assign an ID to the note */
  initId: PropTypes.string,
  /** note Placeholder */
  placeholder: PropTypes.string,
  /** an object that contains all the properties of the note */
  activeNote: PropTypes.object,
  /** pass a new note object to the setter */
  setActiveNote: PropTypes.func,
};

export default Redactor;
