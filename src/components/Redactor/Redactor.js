import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

function Redactor({ classes, initId, editorTools, placeholder, setNote, note }) {
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
  useEffect(() => {
    if (ejInstance?.current) {
      ejInstance?.current.render(note?.data);
    }
  }, [note?.id]);
  const initEditor = async () => {
    const editor = new EditorJS({
      holder: initId,
      placeholder: placeholder || 'Let`s write an awesome note!',
      logLevel: 'ERROR',
      minHeight: 0,
      onReady: () => {
        ejInstance.current = editor;
        if (note && Object.keys(note).length > 0) {
          ejInstance?.current.render(note?.data);
        }
      },
      onChange: async (api) => {
        let content = await api.saver.save();
        if (content.blocks.length === 0) {
          setNote((prev) => ({
            ...prev,
            data: {
              blocks: [
                {
                  type: 'paragraph',
                  data: {},
                },
              ],
              version: '2.8.1',
            },
          }));
        } else {
          setNote((prev) => ({
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
    if (note && Object.keys(note).includes('title')) {
      setTitle(note.title);
    }
  }, [note]);
  return (
    <div className={classes.wrapper}>
      <input
        className={classes.title}
        type="text"
        placeholder="Title"
        maxLength="14"
        value={title}
        onChange={(e) => {
          setNote((prev) => ({ ...prev, title: e.target.value }));
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
  setNote: () => {},
  classes: {},
};

Redactor.propTypes = {
  classes: PropTypes.shape, //TODO переписать проптайпсы  - здесь используется 3 класса: wrapper, redactor, title
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
