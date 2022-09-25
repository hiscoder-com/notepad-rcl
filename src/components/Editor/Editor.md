```jsx
import React from 'react';
import { Editor } from '@texttree/notepad-rcl';

<Editor />;
```

### If you want to use your own method for saving notes, pass it in props

```jsx
import React from 'react';
import { Editor, useData } from '@texttree/notepad-rcl';

const { dBNameRegistration } = useData();

dBNameRegistration('NotepadRCL');

<Editor id="second_note" />;
```

<!--
#### If you want to use an Editor twice or more, give each Editor a unique **`id`**

```jsx
import React from 'react';
import { useData, Editor } from '@texttree/notepad-rcl';

const { dBNameRegistration, getNote, saveNote } = useData();

dBNameRegistration('NotepadRCL');

<Editor getNote={getNote} saveNote={saveNote} id="second_note" />;
```

### **Placeholder**

#### Pass the **`placeholder`** option if you want to set a custom placeholder:

```jsx
import React from 'react';
import { useData, Editor } from '@texttree/notepad-rcl';

const { dBNameRegistration, getNote, saveNote } = useData();

dBNameRegistration('NotepadRCL');

const changePlaceholder = 'changed default text';

<Editor id="third_note" placeholder={changePlaceholder} />;
<Editor
  getNote={getNote}
  saveNote={saveNote}
  id="third_note"
  placeholder={changePlaceholder}
/>;
``` -->
