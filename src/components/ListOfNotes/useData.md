### Using this hook, we save data to the localforage database

```jsx
import React from 'react';
import { useData, Editor } from '@texttree/notepad-rcl';

const { getNote, saveNote } = useData();

<Editor getNote={getNote} saveNote={saveNote} id="save_data_to_DB" />;
```

### If you need to set the database name, you can use the dBNameRegistration method

```jsx
import React from 'react';
import { useData, Editor } from '@texttree/notepad-rcl';

const { dBNameRegistration, getNote, saveNote } = useData();

dBNameRegistration('NotepadRCL');

<Editor getNote={getNote} saveNote={saveNote} id="custom_name_DB" />;
```

### You can also get and edit data from the database using the useState hook.

```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, useData, Editor } from '@texttree/notepad-rcl';

function Component() {
  const { notes, removeNote, addNote, dBNameRegistration, getNote, saveNote } = useData();

  const [idToLoadNote, setIdToLoadNote] = useState('');

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
          notesArray={notes}
          listName="List of Notes"
          passIdToDel={removeNote}
          addNote={addNote}
          passIdToOpen={setIdToLoadNote}
        />
      </div>
      <div style={{ width: '50%' }}>
        <Editor
          id={idToLoadNote}
          placeholder={changePlaceholder}
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
