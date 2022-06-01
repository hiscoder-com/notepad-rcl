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

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    localforage.keys();
    // localforage.keys().then((result) => console.log(result));
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {
    localforage.setItem(holder, editorData);
  }, [editorData]);

  const initEditor = async () => {
    const defData = await localforage.getItem(holder);
    setEditorData(defData);
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
        console.log(content.blocks[0].data.text);
      },
      autofocus: false,
      tools: editorTools,
    });
  };

  return (
    <React.Fragment>
      <div id={holder}></div>
    </React.Fragment>
  );
}

export default Editor;
