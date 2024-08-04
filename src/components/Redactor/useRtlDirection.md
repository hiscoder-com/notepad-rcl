# useRtlDirection

This hook determines the text direction based on the presence of RTL characters. It returns `'ltr'` if the text is predominantly LTR characters and `'rtl'` if the text is predominantly RTL characters.

## Example

```jsx
import React, { useState } from 'react';
import useRtlDirection from './useRtlDirection';

const ExampleComponent = () => {
  const [text, setText] = useState('Hello, world!');
  const direction = useRtlDirection(text);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ direction }}
      />
      <p style={{ direction }}>
        The text direction is: <strong>{direction}</strong>
      </p>
    </div>
  );
};

<ExampleComponent />;
```
