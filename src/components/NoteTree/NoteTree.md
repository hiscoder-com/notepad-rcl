### **Save in Database**

```jsx
import React, { useState } from 'react';
import { NoteTree } from '@texttree/notepad-rcl';

function Component() {
  const [activeNote, setActiveNote] = useState(null);
  const [notes, setNotes] = useState([
    {
      id: 'first_note_key_from_DB',
      title: 'note1',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 0,
    },

    {
      id: 'sixth_note_key_from_DB',
      title: 'note2',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 1,
    },
    {
      id: 'seven_note_key_from_DB',
      title: 'note3',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 2,
    },
    {
      id: 'eight_note_key_from_DB',
      title: 'note4',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 3,
    },
    {
      id: 'nineth_note_key_from_DB',
      title: 'note5',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 4,
    },
    {
      id: 'first_folder_key_from_DB',
      title: 'folder1',
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: true,
      parent_id: null,
      sorting: 5,
    },
    {
      id: 'test_note_key_from_DB',
      title: 'note6',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: 'first_folder_key_from_DB',
      sorting: 4,
    },
    {
      id: 'test2_folder_key_from_DB',
      title: 'folder2',
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: true,
      parent_id: 'first_folder_key_from_DB',
      sorting: 5,
    },
  ]);

  const style = {
    searchContainer: {
      position: 'relative',
      marginBottom: '10px',
      maxWidth: '320px',
    },
    searchInput: {
      border: '0',
      borderBottom: '1px solid #555',
      background: 'transparent',
      width: '100%',
      padding: '24px 0 5px 0',
      fontSize: '14px',
      outline: 'none',
    },
    searchLabel: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      fontSize: '14px',
      color: '#555',
      transition: 'all 0.5s ease-in-out',
    },
    buttonRemoveContainer: {
      marginBottom: '10px',
      marginRight: '10px',
      color: '#EB5E28',
    },
    buttonRenameContainer: {
      marginBottom: '10px',
      color: '#62929E',
    },
    contextMenuContainer: {
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
      zIndex: '100',
      whiteSpace: 'nowrap',
    },
    contextMenuItem: {
      padding: '4px 30px 4px 10px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  };
  const onRename = (id) => {};
  const onDeleteNote = (id) => {};

  return (
    <div>
      <div>
        {!activeNote ? (
          <>
            <NoteTree
              notes={notes}
              style={style}
              onRename={onRename}
              onDeleteNote={onDeleteNote}
            />
            <div className="flex justify-end">
              <button className="text-3xl bg-cyan-400 px-4 py-1 rounded-xl hover:bg-cyan-300">
                +
              </button>
            </div>
          </>
        ) : (
          <div>test</div>
        )}
      </div>
    </div>
  );
}

<Component />;
```
