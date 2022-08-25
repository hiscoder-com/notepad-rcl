```jsx
import React from 'react';
import { ListOfNotes, useData } from '@texttree/notepad-rcl';

const { notes, setNotes, updateNotes } = useData();
<ListOfNotes
  data={notes}
  listName="List of Notes"
  passIdInMD={(id) => updateNotes(id)}
/>;
```
