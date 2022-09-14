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
    // localforage.setItem(holder, editorData); // Так работает

    localforage.getItem(holder).then(function (value) {
      console.log('value:', value);
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
          });
    });
  }, [editorData, inputValue]);

  const initEditor = async () => {
    console.log('holder:', holder);
    const defData = await localforage.getItem(holder);
    console.log('defData:', defData);
    // setEditorData(defData); // Так работает
    setEditorData(defData?.data);
    setInputValue(defData?.title);

    // console.log('defData.data:', defData.data);

    const editor = new EditorJS({
      holder,
      placeholder: placeholder || 'Let`s write an awesome note!',

      logLevel: 'ERROR',

      // data: defData, // Так работает
      data: defData?.data,

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
          style={{
            width: '650px',
            height: '38px',
            fontSize: 'large',
            border: 'none',
            outline: 'none',
          }}
        ></input>
      </div>
      <div id={holder}></div>
    </React.Fragment>
  );
}

export default Editor;
