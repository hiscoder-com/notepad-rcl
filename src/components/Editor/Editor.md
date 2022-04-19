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
  text="Button_1"
  onClick={() => {
    alert('Click');
  }}
/>;
```
