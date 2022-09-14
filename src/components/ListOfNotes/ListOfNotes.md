```jsx
import { useState } from 'react';

import { ListOfNotes, useData, Editor } from '@texttree/notepad-rcl';

const { notes, setNotes, removeItem, addItem } = useData();

const changePlaceholder = 'changed default text';

const [idToLoadNote, setIdToLoadNote] = useState('');

<div style={{ display: 'inline-flex' }}>
  <div style={{ width: '50%' }}>
    <ListOfNotes
      data={notes}
      listName="List of Notes"
      passIdToDel={(id) => removeItem(id)}
      btnName="Delete"
      addItem={addItem}
      passIdToOpen={(id) => setIdToLoadNote(id)}
    />
  </div>
  <div style={{ width: '50%' }}>
    <Editor id={idToLoadNote} placeholder={changePlaceholder} />
  </div>
</div>;
```
