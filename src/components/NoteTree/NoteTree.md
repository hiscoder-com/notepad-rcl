### **Save in Database**

```jsx
import React, { useState } from 'react';
import { NoteTree } from '@texttree/notepad-rcl';

function Component() {
  const [noteId, setNoteId] = useState('test_noteId');
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
  ]);

  return (
    <div>
      <div>
        {!activeNote ? (
          <>
            <NoteTree notes={notes} />
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
