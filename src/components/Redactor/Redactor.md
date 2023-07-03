```jsx
import { Redactor } from '@texttree/notepad-rcl';

<Redactor />;
```

### **id**

#### If you want to use an Redactor twice or more, give each Redactor a unique **`id`**

```jsx
import { useState } from 'react';

import { Redactor } from '@texttree/notepad-rcl';

<Redactor initId="second_note" />;
```

### **Placeholder**

#### Pass the **`placeholder`** option if you want to set a custom placeholder

```jsx
import React from 'react';

import { Redactor } from '@texttree/notepad-rcl';

const changePlaceholder = 'changed default text';

<Redactor initId="placeholder_sample" placeholder={changePlaceholder} />;
```

<!-- ### **Save note**

### If you want to use your own method for saving notes, pass it in props

```jsx
import { useState, useEffect } from 'react';

import { Redactor, useData } from '@texttree/notepad-rcl';

const { saveNote, getNote } = useData();

const [activeNote, setActiveNote] = useState({
  id: 'first_note_key_from_DB',
  title: 'note1',
  data: {
    time: 1550476186479,
    blocks: [
      {
        id: 'zbGZFPM-iI',
        type: 'paragraph',
        data: {
          text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
        },
      },
    ],
    version: '2.27.2',
  },
  created_at: new Date('2022-10-15 07:59:58.3642'),
  isFolder: false,
  parent_id: null,
});
const [notes, setNotes] = useState([
  {
    id: 'first_note_key_from_DB',
    title: 'note1',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
          },
        },
      ],
      version: '2.27.2',
    },
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: false,
    parent_id: null,
  },
  {
    id: 'second_note_key_from_DB',
    title: 'note2',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Designed to be extendable and pluggable with a simple API',
          },
        },
      ],
      version: '2.27.2',
    },
    created_at: new Date('2022-10-15 07:59:58.3642'),
    isFolder: false,
    parent_id: null,
  },
]);

<>
  <Redactor
    activeNote={activeNote}
    setActiveNote={setActiveNote}
    initId={'saveNote_sample'}
  />
  <button
    className={'bg-cyan-300 px-4 py-2 rounded-lg '}
    onClick={() =>
      setNotes((prev) => {
        const array = prev.filter((el) => el.id !== activeNote.id);
        array.unshift(activeNote);
        return array;
      })
    }
  >
    save
  </button>
</>;
``` -->

<!-- ### **Rename the database**

### You can also rename the database from "localforage" -->

<!--
```jsx
import { Editor, useData } from '@texttree/notepad-rcl';

const { dBNameRegistration, saveNote, getNote } = useData();

dBNameRegistration('NotepadRCL');

<Editor id="dBNameRegistration_sample" />;
``` -->
