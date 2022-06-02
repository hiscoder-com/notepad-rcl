```jsx
import React from 'react';

import { useData } from '@texttree/notepad-rcl';

function Component() {
  const notes = useData();
  // return <div>{JSON.stringify(notes)}</div>;
}

<Component />;
```
