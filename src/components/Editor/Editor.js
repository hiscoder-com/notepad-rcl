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
  SaveNoteFn,
  getNote,
  saveNote,
}) {
  const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState({});
  const [inputValue, setInputValue] = useState('');
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
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, [id]);

  // Track the status of the note. If it changes, then save the changes in localforage
  useEffect(() => {
    const timer = setTimeout(() => {
      typeof SaveNoteFn === 'function'
        ? SaveNoteFn(holder, inputValue, editorData)
        : saveNote(holder, inputValue, editorData);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [editorData, inputValue]);

  // Запуск Editor.js
  const initEditor = async () => {
    const defData = await getNote(holder);
    console.log(defData);
    setEditorData(defData?.data);
    setInputValue(defData?.title);

    const editor = new EditorJS({
      holder,
      placeholder: placeholder || 'Let`s write an awesome note!',

      logLevel: 'ERROR',

      data: defData?.data,

      onReady: () => {
        ejInstance.current = editor;
      },

      onChange: async (api, event) => {
        let content = await api.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: false,
      tools: editorTools,
    });
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={inputStyle || defaultTitleStyle}
        ></input>
      </div>
      <div id={holder}></div>
    </React.Fragment>
  );
}

Editor.defaultProps = {
  id: 'note_id',
  placeholder: 'Let`s write an awesome note!',
};

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
  SaveNoteFn: PropTypes.func,
};

export default Editor;
