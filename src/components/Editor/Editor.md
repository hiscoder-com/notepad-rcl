```jsx
import { Editor } from '@texttree/notepad-rcl';

<Editor />;
```

### **id**

#### If you want to use an Editor twice or more, give each Editor a unique **`id`**

```jsx
import { useState } from 'react';
import { Editor } from '@texttree/notepad-rcl';
const [currentEditor, setCurrentEditor] = useState(null);
<Editor
  currentEditor={currentEditor}
  setCurrentEditor={setCurrentEditor}
  id="second_note"
  newNoteId={'newNoteId'}
/>;
```

### **Placeholder**

#### Pass the **`placeholder`** option if you want to set a custom placeholder

```jsx
import React from 'react';
import { Editor } from '@texttree/notepad-rcl';

const changePlaceholder = 'changed default text';

<Editor id="placeholder_sample" placeholder={changePlaceholder} />;
```

### **Save note**

### If you want to use your own method for saving notes, pass it in props

```jsx
import { Editor, useData } from '@texttree/notepad-rcl';

const { saveNote, getNote } = useData();

<Editor id="saveNote_sample" saveBtn="true" saveNote={saveNote} getNote={getNote} />;
```

### **Rename the database**

### You can also rename the database from "localforage"

<!--
```jsx
import { Editor, useData } from '@texttree/notepad-rcl';

const { dBNameRegistration, saveNote, getNote } = useData();

dBNameRegistration('NotepadRCL');

<Editor id="dBNameRegistration_sample" />;
``` -->
