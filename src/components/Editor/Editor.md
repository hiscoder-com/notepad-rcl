<!-- пустой Editor.js -->

<!--
```jsx
import React from 'react';
import { Editor } from '@texttree/notepad-rcl';

<Editor />;
```

 -->

<!-- Editor.js  + id -->

<!--
### **id**

 #### If you want to use an Editor twice or more, give each Editor a unique **`id`**

```jsx
import React from 'react';
import { Editor } from '@texttree/notepad-rcl';

<Editor id="second_note" />;
``` -->

<!-- Editor.js  + Placeholder -->

<!-- ### **Placeholder**

#### Pass the **`placeholder`** option if you want to set a custom placeholder

```jsx
import React from 'react';
import { Editor } from '@texttree/notepad-rcl';

const changePlaceholder = 'changed default text';

<Editor id="placeholder_sample" placeholder={changePlaceholder} />;
``` -->

<!-- Editor.js  + saveNote добавить кнопку сохранения!!! -->

### If you want to use your own method for saving notes, pass it in props

```jsx
import { Editor, useData } from '@texttree/notepad-rcl';

function Component() {
  const { saveNote, getNote } = useData();
  return (
    <div>
      <Editor saveBtn="true" id="saveNote_sample" saveNote={saveNote} getNote={getNote} />
    </div>
  );
}
<Component />;
```

<!-- Editor.js  + getNote -->

<!-- <Editor
  getNote={getNote}
  id="getNote_sample"
/>;
 -->

<!-- Editor.js  + dBNameRegistration -->
<!--

```jsx
import React from 'react';
import { Editor } from '@texttree/notepad-rcl';

dBNameRegistration('NotepadRCL');

<Editor />;
```
 -->

```

```
