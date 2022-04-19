### Default example

```jsx
import React from 'react';

import { Editor } from '@texttree/template-rcl';

<Editor />;
```

### Extend example

```jsx
import React from 'react';

import { Editor } from '@texttree/template-rcl';

<Editor
  text="Button"
  onClick={() => {
    alert('Click');
  }}
/>;
```
