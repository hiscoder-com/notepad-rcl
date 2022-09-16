#### You can connect the following Block Tools:

<ul>
  <li><a href="https://github.com/editor-js/header">**@editorjs/header** — header block</a></li>
	<li><a href="https://github.com/editor-js/quote">**@editorjs/quote** — tool for quotes</a></li>
	<li><a href="https://github.com/vishaltelangre/editorjs-alert">**editorjs-alert** — tool for adding colorful alert messages</a></li>
	<li><a href="https://github.com/kaaaaaaaaaaai/paragraph-with-alignment">**paragraph-with-alignment** — text block base tool with alignment control</a></li>
  <li><a href="https://github.com/editor-js/attaches">**@editorjs/attaches** — attach files to your article</a></li>
  <li><a href="https://github.com/editor-js/embed">**@editorjs/embed** — pasted patterns handling and inserts iframe with embedded content</a></li>
  <li><a href="https://github.com/editor-js/table">**@editorjs/table** — table constructor tool</a></li>
  <li><a href="https://github.com/editor-js/list">**@editorjs/list** — ordered or unordered (bulleted) lists</a></li>
  <li><a href="https://github.com/editor-js/nested-list">**@editorjs/nested-list** — Multi-leveled lists</a></li>
	<li><a href="https://github.com/editor-js/checklist">**@editorjs/checklist** — checklists for your texts</a></li>
  <li><a href="https://github.com/editor-js/link">**@editorjs/link** — link with preview</a></li>
	<li><a href="https://github.com/editor-js/marker">**@editorjs/marker** — tool for highlighting text-fragments</a></li>
	<li><a href="https://github.com/editor-js/inline-code">**@editorjs/inline-code** — tool for marking monospace code-fragments</a></li>
	<li><a href="https://github.com/editor-js/underline">**@editorjs/underline** — underlining text fragments</a></li>
  <li><a href="https://github.com/editor-js/delimiter">**@editorjs/delimiter** — delimiter tool</a></li>
  <li><a href="https://github.com/editor-js/code">**@editorjs/code** — tools for code examples</a></li>

</ul>

<br/>
<br/>

#### Let's add **@editorjs/header** as an dependency into our app.

```jsx
import Header from '@editorjs/header';

import { Editor } from '@texttree/notepad-rcl';

const addTools = { header: Header };

<Editor editorTools={addTools} />;
```

<!-- #### Write a new property for the Tools object and pass it to the Editor via the addTools variable -->
