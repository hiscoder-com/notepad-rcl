import { default as React, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { log } from '../../utils';
import PropTypes from 'prop-types';
import { Box, Container, Typography } from '@material-ui/core';

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'header',
        data: {
          text: 'This is my awesome editor!',
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = (props) => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

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

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
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
      autofocus: true,
      tools: {
        header: Header,
      },
    });
  };

  return (
    <React.Fragment>
      <Container style={{ backgroundColor: '#d4ecff', minHeight: '100vh' }} maxWidth="xl">
        <Box p={5}>
          <Box>
            <Typography variant="h6" component="span">
              EditorJS With React
            </Typography>
          </Box>
          <Box
            mt={2}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cccccc',
            }}
          >
            <div id={EDITTOR_HOLDER_ID}> </div>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Editor;
