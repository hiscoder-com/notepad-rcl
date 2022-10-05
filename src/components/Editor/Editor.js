import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import localforage from 'localforage';
import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

const EDITTOR_HOLDER_ID = 'note_id';

function Editor({
  id,
  newNoteId,
  setNewNoteId,
  editorTools,
  placeholder,
  inputStyle,
  getNote,
  saveNote,
  setCurrentEditor,
  currentEditor,
  notesDb = [],
}) {
  // const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();
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
    if (!ejInstance?.current && newNoteId) {
      setCurrentEditor(null);
      initEditor();
    }
    return () => {
      if (ejInstance?.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
        // setNewNoteId('test');
      }
    };
  }, [newNoteId]);

  useEffect(() => {
    const array = notesDb.find((el) => el.holder === id);

    setCurrentEditor(array); //TODO - это устанавливает не текущий едитор, а загруженный с базы
  }, [id]);

  useEffect(() => {
    if (ejInstance?.current) {
      ejInstance?.current.render(currentEditor.editorData);
    }
  }, [currentEditor?.holder]); //TODO ломается Сейчас при изменении поля эдитора один раз мигает

  // Запуск Editor.js
  const initEditor = async () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      placeholder: placeholder || 'Let`s write an awesome note!',
      logLevel: 'ERROR',
      onReady: () => {
        ejInstance.current = editor;
        console.log(editor);
        const {
          configuration: { holder, data },
        } = editor;
        setCurrentEditor({ editorData: data, holder });
      },
      onChange: async (api, event) => {
        let content = await api.saver.save();
        if (content.blocks.length === 0) {
          setCurrentEditor((prev) => ({
            ...prev,
            editorData: {
              blocks: [
                {
                  type: 'paragraph',
                  data: {},
                },
              ],
            },
          }));
        } else {
          setCurrentEditor((prev) => ({
            ...prev,
            editorData: content,
            holder: newNoteId,
          }));
        }

        // Put your logic here to save this data to your DB
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
          value={currentEditor?.title ?? ''}
          onChange={(e) => {
            setCurrentEditor((prev) => ({ ...prev, title: e.target.value }));
          }}
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
