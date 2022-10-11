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
  const [note, setNote] = useState(null);
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
      created: '2022-10-10T12:51:46.540Z',
      isFolder: false,
      parent: null,
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
      created: '2022-10-10T12:41:46.540Z',
      isFolder: false,
      parent: null,
    },
  ]);

  useEffect(() => {
    const array = notesDb.find((el) => el.id === addedNoteId);
    setNote(array); //TODO - это устанавливает не текущий едитор, а загруженный с базы
  }, [addedNoteId]);

  const addNote = () => {
    setNote({
      id: ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9),
      title: 'new note',
      data: {
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
    const newArray = notesDb.filter((el) => el.id !== id);
    setNotesDb(newArray);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <ListOfNotes
          notes={notesDb}
          passIdToDel={removeNote}
          addNote={addNote}
          setAddedNoteId={setAddedNoteId}
        />
      </div>

      <div style={{ width: '50%' }}>
        <button
          onClick={() =>
            setNotesDb((prev) => {
              // вместо этого сохранять в supabase
              const array = prev.filter((el) => el.id !== note.id);
              array.unshift(note);
              return array;
            })
          }
        >
          save
        </button>
        <Redactor
          initId={addedNoteId}
          setNoteDBId={setNoteDBId}
          note={note}
          setNote={setNote}
          inputStyle={inputStyle}
        />
      </div>
    </div>
  );
}

<Component />;
```

### **Save in localforage**

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

  // const { notes, removeNote, addNote, getNote, saveNote } = useData();

  const [idToLoadNote, setIdToLoadNote] = useState('test');
  const [addedNoteId, setAddedNoteId] = useState('test_addedNoteId');
  const { notes, addNote, removeNote, noteRequest, saveNote } = useData(addedNoteId);

  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async (id) => {
      const result = await noteRequest(id);

      setNote(result);
      return result;
    };
    getNote(addedNoteId);
  }, [addedNoteId]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <ListOfNotes
          notes={notes}
          passIdToDel={removeNote}
          addNote={addNote}
          setAddedNoteId={setAddedNoteId}
          // passIdToOpen={setIdToLoadNote}
        />
      </div>
      <div style={{ width: '50%' }}>
        <button onClick={() => saveNote(addedNoteId, note)}>save</button>
        <Redactor
          note={note}
          setNote={setNote}
          initId={idToLoadNote}
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
