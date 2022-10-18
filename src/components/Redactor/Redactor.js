import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

function Redactor({
  classes,
  initId,
  editorTools,
  placeholder,
  setActiveNote,
  activeNote,
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
      placeholder: placeholder || 'Let`s write an awesome note!',
      logLevel: 'ERROR',
      minHeight: 0,
      onReady: () => {
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
          version: '2.8.1',
        };
        if (content.blocks.length === 0) {
          setActiveNote((prev) => ({
            ...prev,
            data: clearData,
          }));
          await ejInstance?.current.render(clearData);
        } else {
          setActiveNote((prev) => ({
            ...prev,
            data: content,
          }));
        }
      },
      autofocus: false,
      tools: editorTools,
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
      <input
        className={classes.title}
        type="text"
        placeholder="Title"
        maxLength="14"
        value={title}
        onChange={(e) => {
          setActiveNote((prev) => ({ ...prev, title: e.target.value }));
          setTitle(e.target.value);
        }}
      ></input>
      <div className={classes.redactor} id={initId}></div>
    </div>
  );
}

Redactor.defaultProps = {
  initId: 'default_id',
  note: {},
  setActiveNote: () => {},
  classes: {},
};

Redactor.propTypes = {
  // classes: PropTypes.shape, //TODO переписать проптайпсы  - здесь используется 3 класса: wrapper, redactor, title
  /** Write a new property for the Tools object and pass it to the Editor via the addTools variable */
  editorTools: PropTypes.object,
  /** note ID */
  id: PropTypes.string,
  /** note Placeholder */
  placeholder: PropTypes.string,
  /** note save method (by default note is stored in localforage).
Receives the id title and note at the entrance */
};

export default Redactor;
