### Using this hook, we save data to the localforage database

```jsx
import { useState, useEffect } from 'react';

import { useData, Redactor } from '@texttree/notepad-rcl';

const { addNote } = useData();
<>
  <Redactor initId="first" />
  <button
    className="text-3xl bg-gray-400 px-4 py-1 rounded-xl hover:bg-orange-300"
    onClick={addNote}
  >
    +
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
