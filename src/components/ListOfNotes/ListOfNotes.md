### **Save in Database**

```jsx
import { useState, useEffect } from 'react';

import { ListOfNotes, Redactor } from '@texttree/notepad-rcl';

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
        version: '2.25.0',
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
        version: '2.25.0',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
    },
  ]);

  useEffect(() => {
    const note = notes.find((el) => el.id === noteId);
    setActiveNote(note);
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
        version: '2.25.0',
      },
    };
    setActiveNote(newNote);
    setNotes((prev) => [...prev, newNote]);
  };

  const removeNote = (id) => {
    const newArray = notes.filter((el) => el.id !== id);
    setNotes(newArray);
  };

  return (
    <div>
      <div>
        {!activeNote ? (
          <>
            <ListOfNotes
              notes={notes}
              removeNote={removeNote}
              setNoteId={setNoteId}
              classes={{
                wrapper: '',
                item: ' m-5 p-5 bg-cyan-200 h-31 hover:bg-cyan-100 cursor-pointer rounded-lg shadow-md',
                title: 'mr-10 font-bold',
                text: 'overflow-hidden h-20',
                delBtn: 'bg-cyan-300 p-2 rounded-md',
              }}
              delBtnName={'Delete'}
              isShowDate
              isShowText
            />
            <div className="flex justify-end">
              <button
                className="text-3xl bg-cyan-400 px-4 py-1 rounded-xl hover:bg-cyan-300"
                onClick={addNote}
              >
                +
              </button>
            </div>
          </>
        ) : (
          <div className={'bg-cyan-200 p-6 relative'}>
            <Redactor
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              initId={'first'}
              classes={{
                title: 'bg-inherit font-bold',
                redactor: 'px-4 pt-4 pb-20 break-words bg-green-100 m-4',
              }}
            />
            <button
              className={'bg-cyan-300 px-4 py-2 rounded-lg'}
              onClick={() =>
                setNotes((prev) => {
                  const array = prev.filter((el) => el.id !== activeNote.id);
                  array.unshift(activeNote);
                  return array;
                })
              }
            >
              save
            </button>
            <button
              className={
                'bg-blue-300 px-4 py-2 text-lg rounded-lg absolute right-3 top-3'
              }
              onClick={() => {
                setActiveNote(null);
                setNoteId(null);
              }}
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

<Component />;
```

### **save note to database using localforage**

```jsx
import { useState, useEffect } from 'react';

import { ListOfNotes, useData, Redactor } from '@texttree/notepad-rcl';

function Component() {
  const [noteId, setNoteId] = useState('test_noteId');
  const { notes, addNote, removeNote, noteRequest, saveNote } = useData();

  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    const getNote = async (id) => {
      const result = await noteRequest(id);
      setActiveNote(result);
      return result;
    };
    getNote(noteId);
  }, [noteId]);

  return (
    <div>
      <div>
        {!activeNote ? (
          <>
            <ListOfNotes
              notes={notes}
              removeNote={removeNote}
              setNoteId={setNoteId}
              classes={{
                wrapper: '',
                item: ' m-5 p-5 bg-yellow-200 h-31 hover:bg-yellow-100 cursor-pointer rounded-lg shadow-md',
                title: 'mr-10 font-bold',
                text: 'overflow-hidden',
                delBtn: 'bg-orange-300 p-2 mt-4 rounded-lg',
              }}
              delBtnName={'Delete'}
              isShowDate
              dateOptions={{
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              }}
            />
            <div className="flex justify-end">
              <button
                className="text-3xl bg-gray-400 px-4 py-1 rounded-xl hover:bg-orange-300"
                onClick={addNote}
              >
                +
              </button>
            </div>
          </>
        ) : (
          <div className={'bg-yellow-200 p-6 relative shadow-md'}>
            <Redactor
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              initId={'second'}
              classes={{ title: 'bg-inherit font-bold' }}
            />
            <button
              className={'bg-orange-300 px-4 py-2  rounded-lg '}
              onClick={() => saveNote(noteId, activeNote)}
            >
              save
            </button>
            <button
              className={
                'bg-orange-300 px-4 py-2 text-lg rounded-lg absolute right-3 top-3'
              }
              onClick={() => {
                setActiveNote(null);
                setNoteId(null);
              }}
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

<Component />;
```
