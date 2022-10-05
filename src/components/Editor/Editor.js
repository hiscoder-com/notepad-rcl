import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import localforage from 'localforage';
import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

const EDITTOR_HOLDER_ID = 'note_id';

function Editor({
  id,
  editorTools,
  placeholder,
  inputStyle,
  getNote,
  saveNote,
  setCurrentEditor,
  currentEditor,
  notesDb,
}) {
  // const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();

  const defaultTitleStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };
  // This will run only once
  useEffect(() => {
    if (!ejInstance?.current) {
      initEditor();
    }
    return () => {
      if (ejInstance?.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setCurrentEditor(notesDb.find((el) => el.holder === id));
    console.log('!');
  }, [id]);
  //
  useEffect(() => {
    if (ejInstance?.current) {
      ejInstance?.current.render(currentEditor.editorData);
    }
  }, [currentEditor]);

  // Запуск Editor.js
  const initEditor = async () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      placeholder: placeholder || 'Let`s write an awesome note!',
      logLevel: 'ERROR',
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async (api, event) => {
        let content = await api.saver.save();
        // Put your logic here to save this data to your DB
        setCurrentEditor((prev) => ({ ...prev, editorData: content }));
      },
      autofocus: false,
      tools: editorTools,
    });
  };
  // if (editorData) {
  //   console.log(editorData);
  // }
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
          value={currentEditor?.title}
          onChange={(e) =>
            setCurrentEditor((prev) => ({ ...prev, title: e.target.value }))
          }
          style={inputStyle || defaultTitleStyle}
        ></input>
      </div>
      <div id={EDITTOR_HOLDER_ID}></div>
    </React.Fragment>
  );
}

Editor.propTypes = {
  // inputStyle,
  /** Write a new property for the Tools object and pass it to the Editor via the addTools variable */
  editorTools: PropTypes.object,
  /** note ID */
  id: PropTypes.string,
  /** note Placeholder */
  placeholder: PropTypes.string,
  /** note save method (by default note is stored in localforage).
Receives the key title and note at the entrance */
};

export default Editor;
