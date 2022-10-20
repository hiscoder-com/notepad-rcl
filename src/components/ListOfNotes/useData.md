### Using this hook, we save data to the localforage database

```jsx
import { useState, useEffect } from 'react';

import { useData, Redactor } from '@texttree/notepad-rcl';

const initId = 'test_id';

const note = {
  id: 'note00xef4p5p',
  title: 'New lf-note',
  data: {
    blocks: [
      {
        type: 'paragraph',
        data: { text: 'test' },
      },
    ],
    version: '2.25.0',
  },
  created_at: '2022-10-20T11:39:04.244Z',
  parent_id: null,
  isFolder: false,
};
const [activeNote, setActiveNote] = useState({});
const [isSaving, setIsSaving] = useState(false);
const { saveNote, noteRequest } = useData();

useEffect(() => {
  setActiveNote(note);
}, []);

useEffect(() => {
  const getNote = async (id) => {
    const result = await noteRequest(id);
    if (result === null) {
      return;
    }
    setActiveNote(result);
  };
  getNote('id_note');
}, [isSaving]);

<>
  <Redactor initId={initId} activeNote={activeNote} setActiveNote={setActiveNote} />
  <button
    className={'bg-orange-300 px-4 py-2  rounded-lg '}
    onClick={() => {
      setIsSaving(true);
      saveNote('note00xef4p5p', activeNote);
      setIsSaving(false);
    }}
  >
    save
  </button>
</>;
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
