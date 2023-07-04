### With this hook, we save the note to the database using localforage

```jsx
import { useState, useEffect } from 'react';

import { ListOfNotes, useData, Redactor } from '@texttree/notepad-rcl';

function Component() {
  const { notes, addNote, removeNote, noteRequest, saveNote } = useData();

  const [noteId, setNoteId] = useState('test_noteId');
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
                onClick={() => addNote('My custom note title')}
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

<!--
### If you need to set the database name, you can use the dBNameRegistration method

```jsx
import React from 'react';
import { useData, Redactor } from '@texttree/notepad-rcl';

const { dBNameRegistration, getNote, saveNote } = useData();

dBNameRegistration('NotepadRCL');

<Redactor getNote={getNote} saveNote={saveNote} initId={'second'} />;
``` -->

<!--
### You can also get and edit data from the database using the useState hook.

```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, useData, Redactor } from '@texttree/notepad-rcl';

function Component() {
  const { notes, removeNote, addNote, dBNameRegistration, getNote, saveNote } = useData();

  const [noteId, setNoteId] = useState('');

  const changePlaceholder = 'changed default text';

  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  dBNameRegistration('NotepadRCL');

  return (
    <div style={{ display: 'inline-flex' }}>
      <div style={{ width: '50%' }}>
        <ListOfNotes
          notes={notes}
          listName="List of Notes"
          removeNote={removeNote}
          addNote={addNote}
          noteId={setNoteId}
        />
      </div>
      <div style={{ width: '50%' }}>
        <Redactor
          initId={'third'}
          placeholder={changePlaceholder}
          getNote={getNote}
          saveNote={saveNote}
        />
      </div>
    </div>
  );
}

<Component />;
``` -->
