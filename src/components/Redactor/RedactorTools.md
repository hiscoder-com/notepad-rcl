#### You can connect the following Block Tools:

<ul>
  <li><a href="https://github.com/editor-js/header"target="_blank">**@editorjs/header** — header block</a></li>
	<li><a href="https://github.com/editor-js/quote"target="_blank">**@editorjs/quote** — tool for quotes</a></li>
	<li><a href="https://github.com/vishaltelangre/editorjs-alert"target="_blank">**editorjs-alert** — tool for adding colorful alert messages</a></li>
	<li><a href="https://github.com/kaaaaaaaaaaai/paragraph-with-alignment"target="_blank">**paragraph-with-alignment** — text block base tool with alignment control</a></li>
  <li><a href="https://github.com/editor-js/attaches"target="_blank">**@editorjs/attaches** — attach files to your article</a></li>
  <li><a href="https://github.com/editor-js/embed"target="_blank">**@editorjs/embed** — pasted patterns handling and inserts iframe with embedded content</a></li>
  <li><a href="https://github.com/editor-js/table"target="_blank">**@editorjs/table** — table constructor tool</a></li>
  <li><a href="https://github.com/editor-js/list"target="_blank">**@editorjs/list** — ordered or unordered (bulleted) lists</a></li>
  <li><a href="https://github.com/editor-js/nested-list"target="_blank">**@editorjs/nested-list** — Multi-leveled lists</a></li>
	<li><a href="https://github.com/editor-js/checklist"target="_blank">**@editorjs/checklist** — checklists for your texts</a></li>
  <li><a href="https://github.com/editor-js/link"target="_blank">**@editorjs/link** — link with preview</a></li>
	<li><a href="https://github.com/editor-js/marker"target="_blank">**@editorjs/marker** — tool for highlighting text-fragments</a></li>
	<li><a href="https://github.com/editor-js/inline-code"target="_blank">**@editorjs/inline-code** — tool for marking monospace code-fragments</a></li>
	<li><a href="https://github.com/editor-js/underline" target="\_blank">**@editorjs/underline** — underlining text fragments</a></li>
  <li><a href="https://github.com/editor-js/delimiter" target="\_blank">**@editorjs/delimiter** — delimiter tool</a></li>
  <li><a href="https://github.com/editor-js/code" target="\_blank">**@editorjs/code** — tools for code examples</a></li>
</ul>

<br/>
<br/>

#### Let's add **@editorjs/header** as an dependency into our app.

```jsx
import Header from '@editorjs/header';
import ToggleBlock from 'editorjs-toggle-block';

import { Redactor } from '@texttree/notepad-rcl';

const addTools = {
  header: Header,
  toggle: {
    class: ToggleBlock,
    inlineToolbar: true,
  },
};

<Redactor editorTools={addTools} />;
```
