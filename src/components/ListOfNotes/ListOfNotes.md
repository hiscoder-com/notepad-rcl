```jsx
import { useState } from 'react';
import { ListOfNotes, useData, Editor } from '@texttree/notepad-rcl';

function Component() {
  const { notesArray, removeNote, addNote, dBNameRegistration, getNote, saveNote } =
    useData();

  const [idToLoadNote, setIdToLoadNote] = useState('test');

  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  // dBNameRegistration('NotepadRCL');

  return (
    <div style={{ display: 'inline-flex' }}>
      <div style={{ width: '50%' }}>
        <ListOfNotes
          notesArray={notesArray}
          listName="List of Notes"
          passIdToDel={removeNote}
          addNote={addNote}
          passIdToOpen={setIdToLoadNote}
        />
      </div>
      <div style={{ width: '50%' }}>
        <Editor
          id={idToLoadNote}
          inputStyle={inputStyle}
          saveBtn="true"
          getNote={getNote}
          saveNote={saveNote}
        />
      </div>
    </div>
  );
}

<Component />;
```
