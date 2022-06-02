```jsx
import React from 'react';

import { ListOfNotes, useGetList } from '@texttree/notepad-rcl';

function Component() {
  const notes = useGetList();
  return <div>{JSON.stringify(notes)}</div>;
}

<Component />;
```
