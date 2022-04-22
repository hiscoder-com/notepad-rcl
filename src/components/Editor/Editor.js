import { default as React, useState, useEffect, useRef, useMemo } from 'react';
import EditorJS from '@editorjs/editorjs';

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'paragraph',
        data: {
          text: '',
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = 'editorjs';

function Editor({ id, editorTools }) {
  const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState(
    localStorage.getItem(holder)
      ? JSON.parse(localStorage.getItem(holder))
      : DEFAULT_INITIAL_DATA
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
      logLevel: 'ERROR',
      data: editorData,
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
      <div id={id || EDITTOR_HOLDER_ID}> </div>
    </React.Fragment>
  );
}

export default Editor;
