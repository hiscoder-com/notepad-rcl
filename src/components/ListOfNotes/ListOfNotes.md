```jsx
import { useState, useEffect } from 'react';

import { ListOfNotes, useData, Editor } from '@texttree/notepad-rcl';

function Component() {
  const { notes, setNotes, removeItem, addNote } = useData();

  const changePlaceholder = 'changed default text';

  const [idToLoadNote, setIdToLoadNote] = useState('');

  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  return (
    <div style={{ display: 'inline-flex' }}>
      <div style={{ width: '50%' }}>
        <ListOfNotes
          notesArray={notes}
          listName="List of Notes"
          passIdToDel={removeItem}
          addNote={addNote}
          passIdToOpen={setIdToLoadNote}
        />
      </div>
      <div style={{ width: '50%' }}>
        <Editor
          setNotes={setNotes}
          id={idToLoadNote}
          placeholder={changePlaceholder}
          inputStyle={inputStyle}
        />
      </div>
    </div>
  );
}

<Component />;
```
