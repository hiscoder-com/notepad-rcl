#### You can save notes in a database or in localfarage

### **Save in Database**

```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, Redactor } from '@texttree/notepad-rcl';

function Component() {
  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  // noteDBId - запускаем addNote, получаем сюда id из addNote
  // этот id нужен для сохранения заметки в БД
  const [noteDBId, setNoteDBId] = useState('test_noteDBId');
  const [addedNoteId, setAddedNoteId] = useState('test_addedNoteId');
  const [currentEditor, setCurrentEditor] = useState(null);
  const [notesDb, setNotesDb] = useState([
    {
      holder: 'first_note_key_from_DB',
      title: 'note1',
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
      holder: 'second_note_key_from_DB',
      title: 'note2',
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

  useEffect(() => {
    const array = notesDb.find((el) => el.holder === addedNoteId);

    setCurrentEditor(array); //TODO - это устанавливает не текущий едитор, а загруженный с базы
  }, [addedNoteId]);

  // const notes,setNotes=useState([])
  // useEffect={
  // const notesDB = supabase.get(notes)
  // setNotes(notesDB[idcurrent])}

  const addNote = () => {
    setCurrentEditor({
      holder: ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9),
      title: 'new note',
      editorData: {
        blocks: [
          {
            type: 'paragraph',
            data: {},
          },
        ],
      },
    });
  };

  const removeNote = (id) => {
    const newArray = notesDb.filter((el) => el.holder !== id);
    setNotesDb(newArray);
  };

  return (
    <div style={{ display: 'flex' }}>
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
        <Redactor
          initId={addedNoteId}
          setNoteDBId={setNoteDBId}
          currentEditor={currentEditor}
          setCurrentEditor={setCurrentEditor}
          inputStyle={inputStyle}
        />
      </div>
    </div>
  );
}

<Component />;
```

### **Save in localfarage**

```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, useData, Redactor } from '@texttree/notepad-rcl';

function Component() {
  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  const { notesArray, removeNote, addNote, getNote, saveNote } = useData();
  const [idToLoadNote, setIdToLoadNote] = useState('test');
  const [noteLFId, setNoteLFId] = useState('test_noteLFId');

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <ListOfNotes
          notesArray={notesArray}
          passIdToDel={removeNote}
          addNote={addNote}
          passIdToOpen={setIdToLoadNote}
        />
      </div>
      <div style={{ width: '50%' }}>
        <button onClick={() => console.log('save')}>save</button>
        <Redactor
          initId={idToLoadNote}
          inputStyle={inputStyle}
          getNote={getNote}
          saveNote={saveNote}
        />
      </div>
    </div>
  );
}

<Component />;
```
