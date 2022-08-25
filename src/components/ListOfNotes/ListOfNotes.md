```jsx
import React from 'react';

import { ListOfNotes, useData } from '@texttree/notepad-rcl';

const { notes, setNotes, removeItem } = useData();

<ListOfNotes data={notes} listName="List of Notes" passId={(id) => removeItem(id)} />;
```
