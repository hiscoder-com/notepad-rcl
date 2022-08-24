```jsx
import React from 'react';
import { ListOfNotes, useData } from '@texttree/notepad-rcl';

const { notes, setNotes } = useData();
// const listName = 'List of Notes'
<ListOfNotes
  data={notes}
  listName="List of Notes"
  onRemove={(id) => {
    // console.log('notes', notes);
    const newLists = notes.filter((obj) => obj.key !== id);
    setNotes(newLists);
  }}
/>;
```

<!--
```jsx
import React from 'react';

import { ListOfNotes, useData } from '@texttree/notepad-rcl';

function Component() {
  const notes = useData();
  return <div>{JSON.stringify(notes)}</div>;
}

<Component />;
``` -->
