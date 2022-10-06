```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, useData, Editor } from '@texttree/notepad-rcl';

function Component() {
  const { notesArray, dBNameRegistration, getNote, saveNote } = useData();
  // noteDBId - запускаем addNote, получаем сюда id из addNote
  // этот id нужен для сохранения заметки в БД
  const [noteDBId, setNoteDBId] = useState('test_noteDBId');
  const [addedNoteId, setAddedNoteId] = useState('test_addedNoteId');

  const removeNote = (id) => {
    const newArray = notesDb.filter((el) => el.holder !== id);
    setNotesDb(newArray);
  };
  const addNote = () => {
    setNoteDBId(('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9));
  };
  const [notesDb, setNotesDb] = useState([
    {
      holder: '1',
      title: 'text1',
      editorData: {
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
    },
    {
      holder: '2',
      title: 'text2',
      editorData: {
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
    },
  ]);

  //  const notes,setNotes=useState([])
  // useEffect={
  // const notesDB = supabase.get(notes)
  // setNotes(notesDB[idcurrent])}

  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  const [currentEditor, setCurrentEditor] = useState(null);

  // dBNameRegistration('NotepadRCL');

  return (
    <div style={{ display: 'inline-flex' }}>
      <div style={{ width: '50%' }}>
        <ListOfNotes
          notesDb={notesDb}
          listName="List of Notes"
          passIdToDel={removeNote}
          addNote={addNote}
          setAddedNoteId={setAddedNoteId}
        />
      </div>

      <div style={{ width: '50%' }}>
        <button
          onClick={() =>
            setNotesDb((prev) => {
              const array = prev.filter((el) => el.holder !== currentEditor.holder);
              array.unshift(currentEditor);

              return array;
            })
          }
        >
          save
        </button>
        <Editor
          initId={addedNoteId}
          notesDb={notesDb}
          noteDBId={noteDBId}
          setNoteDBId={setNoteDBId}
          currentEditor={currentEditor}
          setCurrentEditor={setCurrentEditor}
          inputStyle={inputStyle}
          // getNote={getNote}
          // saveNote={saveNote}
        />
      </div>
    </div>
  );
}

<Component />;
```
