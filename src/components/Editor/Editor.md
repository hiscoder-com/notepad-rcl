```jsx
import React from 'react';
import { UseData, Editor } from '@texttree/notepad-rcl';

const { dBNameRegistration, getNote, saveNote } = UseData();

dBNameRegistration('NotepadRCL');

<Editor getNote={getNote} saveNote={saveNote} />;
```

#### If you want to use an Editor twice or more, give each Editor a unique **`id`**

```jsx
import React from 'react';
import { UseData, Editor } from '@texttree/notepad-rcl';

const { dBNameRegistration, getNote, saveNote } = UseData();

dBNameRegistration('NotepadRCL');

<Editor getNote={getNote} saveNote={saveNote} id="second_note" />;
```

### **Placeholder**

#### Pass the **`placeholder`** option if you want to set a custom placeholder:

```jsx
import React from 'react';
import { UseData, Editor } from '@texttree/notepad-rcl';

const { dBNameRegistration, getNote, saveNote } = UseData();

dBNameRegistration('NotepadRCL');

const changePlaceholder = 'changed default text';

<Editor id="third_note" placeholder={changePlaceholder} />;
<Editor
  getNote={getNote}
  saveNote={saveNote}
  id="third_note"
  placeholder={changePlaceholder}
/>;
```
