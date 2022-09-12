import { default as React, useState, useEffect, useRef, useMemo } from 'react';
import EditorJS from '@editorjs/editorjs';
import localforage from 'localforage';

const EDITTOR_HOLDER_ID = 'editorjs';
localforage.config({
  name: 'NotepadRCL',
});
function Editor({ id, editorTools, placeholder }) {
  const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState({});
  const [inputValue, setInputValue] = useState('');

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
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
      // This code runs once the value has been loaded
      value
        ? localforage.setItem(holder, { ...value, data: editorData })
        : localforage.setItem(holder, { date: new Date(), data: editorData });
    });
  }, [editorData]);

  const initEditor = async () => {
    const defData = await localforage.getItem(holder);
    setEditorData(defData);
    console.log('defData:', defData);
    const editor = new EditorJS({
      holder,
      placeholder: placeholder || 'Let`s write an awesome note!',

      logLevel: 'ERROR',
      data: defData,
      onReady: () => {
        ejInstance.current = editor;
      },

      onChange: async (api, event) => {
        let content = await api.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
        console.log('content:', content);
      },
      autofocus: false,
      tools: editorTools,
    });
  };

  return (
    <React.Fragment style={{}}>
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
          style={{
            width: '650px',
            height: '38px',
            fontSize: 'large',
            border: 'none',
          }}
        ></input>
      </div>
      <div id={holder}></div>
    </React.Fragment>
  );
}

export default Editor;
