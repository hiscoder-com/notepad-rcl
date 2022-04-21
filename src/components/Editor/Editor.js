import { default as React, useState, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'paragraph',
        data: {
          text: 'Hey. Meet the new Editor!',
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = 'editorjs';

function Editor({ id }) {
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState(
    localStorage.editorData ? JSON.parse(localStorage.editorData) : DEFAULT_INITIAL_DATA
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
    localStorage.setItem('editorData', JSON.stringify(editorData));
  }, [editorData]);
  console.log(editorData);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: id || EDITTOR_HOLDER_ID,
      logLevel: 'ERROR',
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        let content = await this.editorjs.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
        console.log(content);
      },
      autofocus: false,
    });
    console.log(editorData);
  };
  return (
    <React.Fragment>
      <div id={id || EDITTOR_HOLDER_ID}> </div>
    </React.Fragment>
  );
}

export default Editor;
