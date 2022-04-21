import { default as React, useState, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';

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

function ToolsInstallation({ id }) {
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
      },
      autofocus: false,
      tools: {
        header: Header,
        embed: Embed,
        table: Table,
        list: List,
        linkTool: LinkTool,
        quote: Quote,
        marker: Marker,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
      },
    });
  };
  return (
    <React.Fragment>
      <div id={id || EDITTOR_HOLDER_ID}> </div>
    </React.Fragment>
  );
}

export default ToolsInstallation;
