import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

function Redactor({ initId, editorTools, placeholder, inputStyle, setNote, note }) {
  const defaultTitleStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };
  // const id = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();
  const [title, setTitle] = useState('');

  //
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ejInstance?.current) {
        setNote(null);
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
      ejInstance?.current.render(note.value?.note);
    }
  }, [note?.id]);

  useEffect(() => {
    setNote(title);
  }, [title]);

  // Запуск Editor.js
  const initEditor = async () => {
    const editor = new EditorJS({
      holder: initId,
      placeholder: placeholder || 'Let`s write an awesome note!',
      logLevel: 'ERROR',
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async (api, event) => {
        let content = await api.saver.save();
        if (content.blocks.length === 0) {
          setNote((prev) => ({
            ...prev,
            value: {
              ...prev.value,
              note: {
                blocks: [
                  {
                    type: 'paragraph',
                    data: {},
                  },
                ],
              },
            },
          }));
        } else {
          setNote((prev) => ({
            ...prev,
            value: { ...prev.value, note: content },
          }));
        }
      },
      autofocus: false,
      tools: editorTools,
    });
  };

  // Выбираем, какое событие произойдёт при изменении значения title

  const titleSetterChoice = (e) => {
    if (note?.value?.title) {
      setNote((prev) => ({ ...prev, value: { ...prev.value, title: e.target.value } }));
    } else {
      setTitle(e.target.value);
    }
  };

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
          type="text"
          placeholder="Title"
          maxLength="14"
          value={note?.value?.title ?? title}
          onChange={(e) => titleSetterChoice(e)}
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
