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
        version: '2.27.2',
      },
    };
    setActiveNote(newNote);
    setNotes((prev) => [...prev, newNote]);
  };

  const removeNote = (id) => {
    const newArray = notes.filter((el) => el.id !== id);
    setNotes(newArray);
  };
  const wasteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="15px"
      height="15px"
    >
      <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
    </svg>
  );

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
              delBtnChildren={wasteIcon}
              isShowDate
              isShowText
              isShowDelBtn
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

  const wasteIcon = (
    <svg
      width="15px"
      height="15px"
      viewBox="0 0 15 15"
      version="1.1"
      id="waste-basket"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.41,5.58l-1.34,8c-0.0433,0.2368-0.2493,0.4091-0.49,0.41H4.42c-0.2407-0.0009-0.4467-0.1732-0.49-0.41l-1.34-8&#xA;&#x9;C2.5458,5.3074,2.731,5.0506,3.0035,5.0064C3.0288,5.0023,3.0544,5.0002,3.08,5h8.83c0.2761-0.0036,0.5028,0.2174,0.5064,0.4935&#xA;&#x9;C12.4168,5.5225,12.4146,5.5514,12.41,5.58z M13,3.5C13,3.7761,12.7761,4,12.5,4h-10C2.2239,4,2,3.7761,2,3.5S2.2239,3,2.5,3H5V1.5&#xA;&#x9;C5,1.2239,5.2239,1,5.5,1h4C9.7761,1,10,1.2239,10,1.5V3h2.5C12.7761,3,13,3.2239,13,3.5z M9,3V2H6v1H9z"
      />
    </svg>
  );

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
              delBtnChildren={'Delete'}
              isShowDelBtn
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
