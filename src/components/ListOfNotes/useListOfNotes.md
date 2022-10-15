#### You can use hook useListOfNotes

```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, Redactor, useListOfNotes } from '@texttree/notepad-rcl';
import Blocks from 'editorjs-blocks-react-renderer';

function Component() {
  const [noteDBId, setNoteDBId] = useState('test_noteDBId');
  const [noteId, setNoteId] = useState(null);
  const [notesDb, setNotesDb] = useState([
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
        version: '2.8.1',
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
        version: '2.8.1',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
    },
  ]);
  const { note, notes, addNote, removeNote } = useListOfNotes({
    notesDb,
    noteId,
  });
  console.log(note);
  return (
    <div>
      {notes.map((el) => (
        <div
          key={el.id}
          onClick={() => setNoteId(el.id)}
          className={
            el.id === noteId
              ? 'border-2 border-black overflow-hidden m-1'
              : 'border-2 overflow-hidden m-1'
          }
        >
          {JSON.stringify(el)}
        </div>
      ))}
      <button onClick={addNote}>Add</button>{' '}
    </div>
  );
}

<Component />;
```
