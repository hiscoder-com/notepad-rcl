import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import PropTypes from 'prop-types';
import EditorJS from '@editorjs/editorjs';

const EDITTOR_HOLDER_ID = 'note_id';

function Editor({
  id,
  editorTools,
  placeholder,
  inputStyle,
  saveNote,
  getNote,
  saveBtn,
  saveBtnName,
}) {
  const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const editorInstance = useRef();
  const [editor, setEditor] = useState({});
  const [title, setTitle] = useState('');
  const defaultTitleStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  // This will run only once
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!editorInstance?.current) {
        console.log('!editorInstance');
        initEditor();
      }
      return () => {
        if (editorInstance?.current) {
          console.log('editorInstance.current');

          editorInstance.current.destroy();
          editorInstance.current = null;
        }
      };
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [holder]);

  // To get all entry's data from Editor.js, call the save() method on the class instance. It will return a Promise that resolves with clean data
  const onSave = () => {
    editor
      .save()
      .then((outputData) => {
        saveNote(holder, title, outputData);
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  };

  const showBtn = () => {
    let result;
    saveBtn === 'true' ? (result = { color: '#e67e22' }) : (result = { display: 'none' });
    return result;
  };

  const initEditor = async () => {
    const defData = await getNote(holder);
    setTitle(defData?.title);
    setEditor(defData?.data);

    const editor = new EditorJS({
      holder,
      placeholder: placeholder || 'Let`s write an awesome note!',

      logLevel: 'ERROR',

      data: defData?.data,

      onReady: () => {
        editorInstance.current = editor;
      },

      autofocus: false,
      tools: editorTools,
    });
    setEditor(editor);
  };

  return (
    <React.Fragment>
      <button onClick={onSave} style={showBtn()}>
        {saveBtnName}
      </button>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle || defaultTitleStyle}
        ></input>
      </div>
      <div id={holder}></div>
    </React.Fragment>
  );
}

Editor.defaultProps = {
  saveBtnName: 'Save',
  getNote: () => {},
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
