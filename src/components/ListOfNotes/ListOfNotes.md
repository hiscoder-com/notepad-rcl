```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, useData, Editor } from '@texttree/notepad-rcl';

function Component() {
  const { notes, removeNote, addNote, dBNameRegistration, getNote, saveNote } = useData();

  const changePlaceholder = 'changed default text';

  const [idToLoadNote, setIdToLoadNote] = useState('');

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
