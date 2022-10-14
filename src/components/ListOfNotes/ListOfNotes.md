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

  // этот id нужен для сохранения заметки в БД
  const [noteDBId, setNoteDBId] = useState('test_noteDBId');
  const [noteId, setNoteId] = useState('test_noteId');
  const [note, setNote] = useState(null);
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
        version: '2.8.1',
      },
      created_at: '2022-10-10T12:51:46.540Z',
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
      created_at: '2022-10-10T12:41:46.540Z',
      isFolder: false,
      parent_id: null,
    },
  ]);

  useEffect(() => {
    //TODO -пример очищения эдитора
    if (notes.length === 0) {
      console.log('здесь');
      setNote({
        title: '',
        id: ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9),
        data: {
          blocks: [
            {
              type: 'paragraph',
              data: {},
            },
          ],
        },
      });
    }
  }, [notes]);

  useEffect(() => {
    const array = notes.find((el) => el.id === noteId);
    setNote(array);
  }, [noteId]);

  const addNote = () => {
    const newNote = {
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
    };
    setNote(newNote);
    setNotes((prev) => [...prev, newNote]);
  };

  const removeNote = (id) => {
    const newArray = notes.filter((el) => el.id !== id);
    setNotes(newArray);
  };
  console.log({ note, notes });
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <button onClick={() => addNote()}>Add note</button>

        <ListOfNotes
          notes={notes}
          passIdToDel={removeNote}
          addNote={addNote}
          setNoteId={setNoteId}
          // classes={classes}
        />
      </div>

      {note && notes.length > 0 && (
        <div style={{ width: '50%' }}>
          <button
            onClick={() =>
              setNotes((prev) => {
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
            initId={'first'}
            note={note}
            setNote={setNote}
            inputStyle={inputStyle}
          />
        </div>
      )}
    </div>
  );
}

<Component />;
```

### **Save using localforage**

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

  const [idToLoadNote, setIdToLoadNote] = useState('test');
  const [noteId, setNoteId] = useState('test_noteId');
  const { notes, addNote, removeNote, noteRequest, saveNote } = useData();

  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async (id) => {
      const result = await noteRequest(id);
      setNote(result);
      return result;
    };
    getNote(noteId);
  }, [noteId]);
  console.log({ noteId });

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {!note ? (
          <>
            <button onClick={() => addNote()}>Add note</button>

            <ListOfNotes
              notes={notes}
              passIdToDel={removeNote}
              addNote={addNote}
              setNoteId={setNoteId}
            />
          </>
        ) : (
          <div style={{ width: '50%' }}>
            <button onClick={() => saveNote(noteId, note)}>save</button>
            <Redactor
              note={note}
              setNote={setNote}
              initId={'second'}
              inputStyle={inputStyle}
            />
            <button
              onClick={() => {
                setNote(null);
                setNoteId(null);
              }}
            >
              close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

<Component />;
```
