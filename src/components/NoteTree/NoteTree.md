### **Save in Database**

```jsx
import React, { useState } from 'react';
import { NoteTree } from '@texttree/notepad-rcl';

function Component() {
  const [noteId, setNoteId] = useState('test_noteId');
  const [activeNote, setActiveNote] = useState(null);

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
      color: 'red',
    },
    buttonRenameContainer: {
      marginBottom: '10px',
      color: 'blue',
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

  const notes = [
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
    },
    {
      id: 'second_note_key_from_DB',
      title: 'note2',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Designed to be extendable and pluggable with a simple API',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: 'first_folder_key_from_DB',
    },
    {
      id: 'first_folder_key_from_DB',
      title: 'folder1',
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: true,
      parent_id: null,
    },
    {
      id: 'second_folder_key_from_DB',
      title: 'folder2',
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: true,
      parent_id: 'first_folder_key_from_DB',
    },
    {
      id: 'third_note_key_from_DB',
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
      parent_id: 'second_folder_key_from_DB',
    },
    {
      id: 'third_folder_key_from_DB',
      title: 'folder3',
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: true,
      parent_id: 'second_folder_key_from_DB',
    },
    {
      id: 'fourth_note_key_from_DB',
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
      parent_id: 'third_folder_key_from_DB',
    },
    {
      id: 'fifth_note_key_from_DB',
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
      parent_id: 'third_folder_key_from_DB',
    },
    {
      id: 'sixth_note_key_from_DB',
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
      parent_id: null,
    },
  ];

  function convertNotesToSampleData(notes) {
    function findChildren(id) {
      const children = [];
      notes.forEach((note) => {
        if (note.parent_id === id) {
          const child = { id: note.id, name: note.title };
          if (note.isFolder) {
            child.children = findChildren(note.id);
          }
          children.push(child);
        }
      });
      return children;
    }

    const resultArray = [];
    notes.forEach((note) => {
      if (note.parent_id === null) {
        const item = { id: note.id, name: note.title };
        if (note.isFolder) {
          item.children = findChildren(note.id);
        }
        resultArray.push(item);
      }
    });

    return resultArray;
  }

  return (
    <div>
      <div>
        {!activeNote ? (
          <>
            <NoteTree notes={convertNotesToSampleData(notes)} style={style} />
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
