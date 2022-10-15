#### You can save notes in a database or in localfarage

### **Save in Database**

```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, Redactor } from '@texttree/notepad-rcl';
import Blocks from 'editorjs-blocks-react-renderer';

function Component() {
  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  // этот id нужен для сохранения заметки в БД
  const [noteDBId, setNoteDBId] = useState('test_noteDBId');
  const [noteId, setNoteId] = useState('test_noteId');
  const [note, setNote] = useState(null);
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
        version: '2.8.1',
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
        version: '2.8.1',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
    },
  ]);

  useEffect(() => {
    //TODO -пример очищения эдитора
    if (notes.length === 0) {
      setNote({
        title: '',
        id: ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9),
        data: {
          blocks: [
            {
              type: 'paragraph',
              data: {},
            },
          ],
          version: '2.8.1',
        },
      });
    }
  }, [notes]);

  useEffect(() => {
    const array = notes.find((el) => el.id === noteId);
    setNote(array);
  }, [noteId]);

  const addNote = () => {
    const newNote = {
      id: ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9),
      title: 'new note',
      data: {
        blocks: [
          {
            type: 'paragraph',
            data: {},
          },
        ],
        version: '2.8.1',
      },
    };
    setNote(newNote);
    setNotes((prev) => [...prev, newNote]);
  };

  const removeNote = (id) => {
    const newArray = notes.filter((el) => el.id !== id);
    setNotes(newArray);
  };
  return (
    <div>
      <div>
        {!note ? (
          <>
            <ListOfNotes
              notes={notes}
              removeNote={removeNote}
              setNoteId={setNoteId}
              classes={{
                wrapper: '',
                item: ' m-5 p-5 bg-cyan-200 h-31 hover:bg-cyan-100 cursor-pointer rounded-lg',
                title: 'mr-10 font-bold',
                text: 'overflow-hidden h-20',
                delBtn: 'bg-cyan-300 p-2 rounded-md',
              }}
              delBtnName={'Delete'}
              isShowDate={true}
            />
            <div className="flex justify-end">
              <button
                className="text-3xl bg-cyan-400 px-4 py-1 rounded-xl hover:bg-cyan-300"
                onClick={addNote}
              >
                +
              </button>
            </div>
          </>
        ) : (
          <div className={'bg-cyan-200 p-6 relative'}>
            <Redactor
              note={note}
              setNote={setNote}
              initId={'first'}
              classes={{
                title: 'bg-inherit font-bold',
                redactor: 'px-4 pt-4 pb-20 break-words bg-green-100 m-4',
              }}
            />
            <button
              className={'bg-cyan-300 px-4 py-2  rounded-lg '}
              onClick={() =>
                setNotes((prev) => {
                  // вместо этого сохранять в supabase
                  const array = prev.filter((el) => el.id !== note.id);
                  array.unshift(note);
                  return array;
                })
              }
            >
              save
            </button>
            <button
              className={
                'bg-blue-300 px-4 py-2 text-lg rounded-lg absolute right-3 top-3'
              }
              onClick={() => {
                setNote(null);
                setNoteId(null);
              }}
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

<Component />;
```

### **Save using localforage**

```jsx
import { useState, useEffect } from 'react';
import { ListOfNotes, useData, Redactor } from '@texttree/notepad-rcl';
import Blocks from 'editorjs-blocks-react-renderer';
const wasteIcon = <div>fff</div>;
function Component() {
  const inputStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  const [idToLoadNote, setIdToLoadNote] = useState('test');
  const [noteId, setNoteId] = useState('test_noteId');
  const { notes, addNote, removeNote, noteRequest, saveNote } = useData();

  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async (id) => {
      const result = await noteRequest(id);
      setNote(result);
      return result;
    };
    getNote(noteId);
  }, [noteId]);

  return (
    <div>
      <div>
        {!note ? (
          <>
            <ListOfNotes
              notes={notes}
              removeNote={removeNote}
              setNoteId={setNoteId}
              classes={{
                wrapper: '',
                item: ' m-5 p-5 bg-yellow-200 h-31 hover:bg-yellow-100 cursor-pointer rounded-lg',
                title: 'mr-10 font-bold',
                text: 'overflow-hidden',
                delBtn: 'bg-orange-300 p-2 mt-4 rounded-lg',
              }}
              delBtnName={'Delete'}
              isShowDate
            />
            <div className="flex justify-end">
              <button
                className="text-3xl bg-gray-400 px-4 py-1 rounded-xl hover:bg-orange-300"
                onClick={addNote}
              >
                +
              </button>
            </div>
          </>
        ) : (
          <div className={'bg-yellow-200 p-6 relative'}>
            <Redactor
              note={note}
              setNote={setNote}
              initId={'second'}
              classes={{ title: 'bg-inherit font-bold' }}
            />
            <button
              className={'bg-orange-300 px-4 py-2  rounded-lg '}
              onClick={() => saveNote(noteId, note)}
            >
              save
            </button>
            <button
              className={
                'bg-orange-300 px-4 py-2 text-lg rounded-lg absolute right-3 top-3'
              }
              onClick={() => {
                setNote(null);
                setNoteId(null);
              }}
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

<Component />;
```
