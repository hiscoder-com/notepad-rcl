```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, useData, Editor } from '@texttree/notepad-rcl';

function Component() {
  const { notesArray, removeNote, addNote, dBNameRegistration, getNote, saveNote } =
    useData();

  const [notesDb, setNotesDb] = useState([
    {
      holder: '1',
      title: 'text1',
      editorData: {
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
        version: '2.8.1',
      },
    },
    {
      holder: '2',
      title: 'text2',
      editorData: {
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
        version: '2.8.1',
      },
    },
  ]);

  //  const notes,setNotes=useState([])
  // useEffect={
  // const notesDB = supabase.get(notes)
  // setNotes(notesDB[idcurrent])}

  const [idNote, setIdNote] = useState('test');

  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  const [currentEditor, setCurrentEditor] = useState();

  // console.log(
  //   currentEditor && notesDb.filter((el) => el.holder !== currentEditor.holder),
  //   'try'
  // );

  // dBNameRegistration('NotepadRCL');

  return (
    <div style={{ display: 'inline-flex' }}>
      <div style={{ width: '50%' }}>
        <ListOfNotes
          notesDb={notesDb}
          listName="List of Notes"
          passIdToDel={removeNote}
          addNote={addNote}
          setIdNote={setIdNote}
        />
      </div>

      <div style={{ width: '50%' }}>
        <button
          onClick={() =>
            setNotesDb((prev) => {
              const array = prev.filter((el) => el.holder !== currentEditor.holder);

              array.push(currentEditor);

              return array;
            })
          }
        >
          save
        </button>
        <Editor
          id={idNote}
          notesDb={notesDb}
          inputStyle={inputStyle}
          saveBtn="true"
          getNote={getNote}
          saveNote={saveNote}
          currentEditor={currentEditor}
          setCurrentEditor={setCurrentEditor}
        />
      </div>
    </div>
  );
}

<Component />;
```
