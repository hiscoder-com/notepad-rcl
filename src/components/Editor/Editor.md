### Default example

```jsx
import React from 'react';

import { Editor } from '@texttree/notepad-rcl';

const Empty = () => <>Empty Layout</>;

<Editor Layout={Empty} />;
```

### Extend example

```jsx
import React from 'react';

import { Editor } from '@texttree/notepad-rcl';

localStorage.setItem(
  'projector_data',
  JSON.stringify({
    fontSize: '150',
    verse: 'Verse Text',
    reference: 'Gen 4:3',
  })
);

const ScreenLayout = ({ fontSize, verse, reference }) => {
  return (
    <div style={{ fontSize: fontSize + '%' }}>
      <p>{verse}</p>
      <b>
        <small>{reference}</small>
      </b>
    </div>
  );
};

const Component = () => {
  return <Editor Layout={ScreenLayout} />;
};

<Component />;
```
