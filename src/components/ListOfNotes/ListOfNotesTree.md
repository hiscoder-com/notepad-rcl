### **Save in Database**

```jsx
import { useState, useEffect } from 'react';
import { ListOfNotesTree, Redactor } from '@texttree/notepad-rcl';
import Blocks from 'editorjs-blocks-react-renderer';
const icons = {
  openedFolder: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
    </svg>
  ),
  closedFolder: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
  ),
  note: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  ),
};
function Component() {
  // этот id нужен для сохранения заметки в БД

  const [activeNote, setActiveNote] = useState({
    id: null,

    isFolder: true,
  });

  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'folder1',
      isFolder: true,
      parent_id: null,
    },
    {
      id: '2',
      title: 'folder2',
      isFolder: true,
      parent_id: '1',
    },
    {
      id: '4',
      title: 'folder4',
      isFolder: true,
      parent_id: null,
    },
    {
      id: '5',
      title: 'folder5',
      isFolder: true,
      parent_id: null,
    },
    {
      id: '3',
      title: 'note3',
      data: {
        time: 1550476186479,
        blocks: [
          {
            type: 'paragraph',
            data: {},
          },
        ],
        version: '2.8.1',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: '2',
    },
  ]);

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
      parent_id: !activeNote
        ? null
        : activeNote.isFolder
        ? activeNote.id
        : activeNote.parent_id,
    };
    setActiveNote(newNote);
    setNotes((prev) => [...prev, newNote]);
  };
  const addFolder = () => {
    const newFolder = {
      id: ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9),
      title: 'new folder',
      parent_id: !activeNote
        ? null
        : activeNote.isFolder
        ? activeNote.id
        : activeNote.parent_id,
      isFolder: true,
    };
    setActiveNote(newFolder);
    setNotes((prev) => [...prev, newFolder]);
  };

  const removeNote = (id) => {
    const newArray = notes.filter((el) => el.id !== id);
    setNotes(newArray);
  };
  const styleTree = {
    tree: {
      base: { backgroundColor: '#fff' },
    },
  };
  return (
    <div>
      <div>
        {!activeNote || activeNote.isFolder ? (
          <>
            <ListOfNotesTree
              notes={notes}
              setActiveNote={setActiveNote}
              activeNote={activeNote}
              icons={icons}
              style={styleTree}
              classes={{ bgActiveNote: 'bg-gray-200', wrapper: 'flex', title: 'ml-3' }}
            />
            <div className="flex justify-end">
              <button
                className="text-3xl bg-cyan-400 px-4 py-1 rounded-xl hover:bg-cyan-300"
                onClick={addNote}
              >
                +{icons.note}
              </button>
              <button
                className="text-3xl bg-cyan-400 px-4 py-1 rounded-xl hover:bg-cyan-300"
                onClick={addFolder}
              >
                +{icons.closedFolder}
              </button>
            </div>
          </>
        ) : (
          <div className={'bg-cyan-200 p-6 relative'}>
            <Redactor
              activeNote={activeNote}
              setActiveNote={setActiveNote}
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
                  const array = prev.filter((el) => el.id !== activeNote.id);
                  array.unshift(activeNote);
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
                setActiveNote(null);
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
