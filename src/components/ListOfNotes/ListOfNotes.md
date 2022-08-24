```jsx
import React from 'react';
import { ListOfNotes, useData } from '@texttree/notepad-rcl';

const notes = useData();
// const listName = 'List of Notes'
<ListOfNotes data={notes} listName="List of Notes" />;
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
