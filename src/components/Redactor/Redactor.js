import { default as React, useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

function Redactor({
  classes,
  initId,
  editorTools,
  placeholder,
  setActiveNote,
  activeNote,
  readOnly,
}) {
  const ejInstance = useRef();

  const [title, setTitle] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ejInstance?.current) {
        initEditor();
      }
      return () => {
        if (ejInstance?.current) {
          ejInstance.current.destroy();
          ejInstance.current = null;
        }
      };
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const initEditor = async () => {
    const editor = new EditorJS({
      holder: initId,
      placeholder: placeholder,
      logLevel: 'ERROR',
      minHeight: 0,
      onReady: () => {
        console.log(editor);
        ejInstance.current = editor;
        if (activeNote && Object.keys(activeNote).length > 0) {
          ejInstance?.current.render(activeNote?.data);
        }
      },
      onChange: async (api) => {
        let content = await api.saver.save();
        const clearData = {
          blocks: [
            {
              type: 'paragraph',
              data: {},
            },
          ],
          version: '2.25.0',
        };
        if (content.blocks.length === 0) {
          setActiveNote((prev) => ({
            ...prev,
            data: clearData,
          }));
          ejInstance?.current
            .render(clearData)
            .then((result) => {
              ejInstance?.current.focus();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setActiveNote((prev) => ({
            ...prev,
            data: content,
          }));
        }
      },
      autofocus: false,
      tools: editorTools,
      readOnly,
    });
  };

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
      <div className={classes.redactor} id={initId}></div>
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
