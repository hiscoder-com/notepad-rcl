```jsx
import React from 'react';
import { ListOfNotes, useData } from '@texttree/notepad-rcl';

const notes = useData();

<ListOfNotes data={notes} />;
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
