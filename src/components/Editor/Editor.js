import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

function Editor({
  initId,
  noteDBId,
  setNoteDBId,
  editorTools,
  placeholder,
  inputStyle,
  getNote,
  saveNote,
  setCurrentEditor,
  currentEditor,
  notesDb,
}) {
  const defaultTitleStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };
  // const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();
  const [title, setTitle] = useState('');

  //
  useEffect(() => {
    if (!ejInstance?.current && noteDBId) {
      setCurrentEditor(null);
      initEditor();
    }
    return () => {
      if (ejInstance?.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
        // setNoteDBId('test');
      }
    };
  }, [noteDBId]);

  useEffect(() => {
    const array = notesDb.find((el) => el.holder === initId);

    setCurrentEditor(array); //TODO - это устанавливает не текущий едитор, а загруженный с базы
  }, [initId]);

  useEffect(() => {
    if (ejInstance?.current) {
      ejInstance?.current.render(currentEditor.editorData);
    }
  }, [currentEditor?.holder]); //TODO ломается Сейчас при изменении поля эдитора один раз мигает

  useEffect(() => {
    setCurrentEditor(title);
  }, [title]);

  // Запуск Editor.js
  const initEditor = async () => {
    const editor = new EditorJS({
      holder: initId,
      placeholder: placeholder || 'Let`s write an awesome note!',
      logLevel: 'ERROR',
      onReady: () => {
        ejInstance.current = editor;
        // setCurrentEditor({ editorData: data, holder });
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
          }));
        }
      },
      autofocus: false,
      tools: editorTools,
    });
    console.log({ editor });
  };

  // Выбираем, какое событие произойдёт при изменении значения title

  const titleSetterChoice = (e) => {
    if (currentEditor?.title) {
      setCurrentEditor((prev) => ({ ...prev, title: e.target.value }));
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
          value={currentEditor?.title ?? title}
          onChange={(e) => titleSetterChoice(e)}
          style={inputStyle || defaultTitleStyle}
        ></input>
      </div>
      <div id={initId}></div>
    </React.Fragment>
  );
}

Editor.defaultProps = {
  initId: 'default_id',
  notesDb: [],
  noteDBId: '',
  setNoteDBId: '',
  currentEditor: {},
  setCurrentEditor: () => {},
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
};

export default Editor;
