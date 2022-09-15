import { default as React, useState, useEffect, useRef, useMemo } from 'react';
import EditorJS from '@editorjs/editorjs';
import localforage from 'localforage';

const EDITTOR_HOLDER_ID = 'editorjs';
localforage.config({
  name: 'NotepadRCL',
});

function Editor({ id, editorTools, placeholder, inputStyle }) {
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
    localforage.keys();
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {
    localforage.getItem(holder).then(function (value) {
      value
        ? localforage.setItem(holder, {
            ...value,
            title: inputValue || 'New note',
            data: editorData,
          })
        : localforage.setItem(holder, {
            title: inputValue,
            data: editorData,
            created: new Date(),
            isParent: null,
            isFolder: false,
          });
    });
  }, [editorData, inputValue]);

  const initEditor = async () => {
    const defData = await localforage.getItem(holder);
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

export default Editor;
