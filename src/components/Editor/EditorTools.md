#### You can connect the following Block Tools: header, embed, table, list, link, quote, marker, checklist, delimiter, inline-code

#### Let's add @editorjs/header as an dependency into our app.

```jsx
import Header from '@editorjs/header';

import { Editor } from '@texttree/notepad-rcl';

const addTools = { header: Header };

<Editor editorTools={addTools} />;
```

#### Write a new property for the Tools object and pass it to the Editor via the addTools variable

```jsx

```
