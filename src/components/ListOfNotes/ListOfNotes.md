```jsx
import { useState, useEffect } from 'react';

import { ListOfNotes, useData, Editor } from '@texttree/notepad-rcl';

const { notes, setNotes, removeItem, addItem } = useData();

const changePlaceholder = 'changed default text';

const [idToLoadNote, setIdToLoadNote] = useState('');

const inputStyle = {
  width: '650px',
  height: '38px',
  fontSize: 'large',
  border: 'none',
  outline: 'none',
};

<div style={{ display: 'inline-flex' }}>
  <div style={{ width: '50%' }}>
    <ListOfNotes
      data={notes}
      listName="List of Notes"
      passIdToDel={(id) => removeItem(id)}
      addItem={addItem}
      passIdToOpen={(id) => setIdToLoadNote(id)}
    />
  </div>
  <div style={{ width: '50%' }}>
    <Editor id={idToLoadNote} placeholder={changePlaceholder} inputStyle={inputStyle} />
  </div>
</div>;
```
