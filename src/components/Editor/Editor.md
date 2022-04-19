### Default example

```jsx
import React from 'react';

import { Editor } from '@texttree/notepad-rcl';

<Editor />;
```

### Extend example

```jsx
import React from 'react';

import { Editor } from '@texttree/notepad-rcl';

<Editor
  text="Button"
  onClick={() => {
    alert('Click');
  }}
/>;
```
