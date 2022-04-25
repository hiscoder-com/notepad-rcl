
```jsx
import React from 'react';

import { Editor } from '@texttree/notepad-rcl';


<Editor />;
```

#### If you want to use an Editor twice or more, give each Editor a unique **`id`**


```jsx
import React from 'react';

import { Editor } from '@texttree/notepad-rcl';


<Editor id="some_new_id" />;
```

### **Placeholder**

#### Pass the **`placeholder`** option if you want to set a custom placeholder:

```jsx
placeholder: 'Let`s write an awesome note!';

```
