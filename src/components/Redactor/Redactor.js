import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

function Redactor({
  classes = {},
  initId,
  editorTools,
  placeholder,
  inputStyle,
  setNote,
  note,
}) {
  const defaultTitleStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };
  const ejInstance = useRef();
  const [title, setTitle] = useState('');
  //
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
    <React.Fragment>
      <div
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <input
          className={classes.title}
          type="text"
          placeholder="Title"
          maxLength="14"
          value={title} // TODO если в середине input набирать, курсор смещается в конец - надо исправить
          onChange={(e) => {
            setNote((prev) => ({ ...prev, title: e.target.value }));
            setTitle(e.target.value);
          }}
          style={inputStyle || defaultTitleStyle}
        ></input>
      </div>
      <div id={initId}></div>
    </React.Fragment>
  );
}

Redactor.defaultProps = {
  initId: 'default_id',
  setNoteDBId: '',
  note: {},
  setNote: () => {},
};

Redactor.propTypes = {
  // inputStyle,
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
