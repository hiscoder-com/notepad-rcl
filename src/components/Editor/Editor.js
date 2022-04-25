
import { default as React, useState, useEffect, useRef, useMemo } from 'react';
import EditorJS from '@editorjs/editorjs';

const EDITTOR_HOLDER_ID = 'editorjs';

function Editor({ id, editorTools, placeholder }) {
  const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState(
    localStorage.getItem(holder) ? JSON.parse(localStorage.getItem(holder)) : {}
  );


  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);


  useEffect(() => {
    localStorage.setItem(holder, JSON.stringify(editorData));
  }, [editorData]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: id || EDITTOR_HOLDER_ID,
      placeholder: placeholder || 'Let`s write an awesome note!',

      logLevel: 'ERROR',
      data: editorData,
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
      <div id={id || EDITTOR_HOLDER_ID}> </div>
    </React.Fragment>
  );
}


export default Editor;
