### **Processing single, double and triple clicks on a tree node**

In this example, one click on a tree node deletes the node, two clicks rename the node, and three clicks expand all children of the selected node

```jsx
import React, { useState, useEffect } from 'react';
import { TreeView } from '@texttree/notepad-rcl';
import { style } from './data';

function Component() {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState([
    { id: '1', name: 'Unread' },
    { id: '2', name: 'Threads' },
    {
      id: '3',
      name: 'Chat Rooms',
      children: [
        { id: 'c1', name: 'General' },
        { id: 'c2', name: 'Random' },
        {
          id: 'c3',
          name: 'Direct Messages',
          children: [
            { id: 'd1', name: 'Alice' },
            { id: 'd2', name: 'Bob' },
            { id: 'd3', name: 'Charlie' },
          ],
        },
      ],
    },
  ]);
  const [dataForTreeView, setDataForTreeView] = useState(databaseNotes);

  useEffect(() => {
    setDataForTreeView(databaseNotes);
  }, [databaseNotes]);

  const recursivelyModifyNode = (notes, nodeId, action, newName = null) => {
    return notes.reduce((acc, note) => {
      if (note.id === nodeId) {
        if (action === 'remove') {
          return acc;
        } else if (action === 'rename') {
          acc.push({ ...note, name: newName });
          return acc;
        }
      }

      const updatedChildren =
        note.children && recursivelyModifyNode(note.children, nodeId, action, newName);

      acc.push({
        ...note,
        children: updatedChildren,
      });

      return acc;
    }, []);
  };

  const handleDeleteNode = ({ ids }) => {
    const updatedNote = databaseNotes.filter((el) => el.id !== ids[0]);

    setDatabaseNotes(updatedNote);
  };

  const removeNode = () => {
    const updatedNotes = recursivelyModifyNode(databaseNotes, hoveredNodeId, 'remove');
    setDatabaseNotes(updatedNotes);
  };

  const handleRenameNode = (newName, nodeId) => {
    if (nodeId) {
      const updatedNotes = recursivelyModifyNode(
        databaseNotes,
        nodeId,
        'rename',
        newName
      );
      setDatabaseNotes(updatedNotes);
    }
  };

  return (
    <>
      <TreeView
        style={style}
        data={dataForTreeView}
        handleOnClick={{ changeNode: removeNode }}
        handleDoubleClick={'rename'}
        handleTripleClick={'openAll'}
        handleRenameNode={handleRenameNode}
        hoveredNodeId={hoveredNodeId}
        setHoveredNodeId={setHoveredNodeId}
        selectedNodeId={selectedNodeId}
        setSelectedNodeId={setSelectedNodeId}
        handleDeleteNode={handleDeleteNode}
      />
    </>
  );
}

<Component />;
```

### **Saving to the database and using Drag and drop sorting**

```jsx
import React, { useState, useEffect } from 'react';
import { TreeView, Redactor } from '@texttree/notepad-rcl';
import { initialData, style } from './data';

function Component() {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(initialData);
  const [dataForTreeView, setDataForTreeView] = useState(
    convertNotesToTree(databaseNotes)
  );

  function convertNotesToTree(notes, parentId = null) {
    const filteredNotes = notes.filter((note) => note.parent_id === parentId);

    filteredNotes.sort((a, b) => a.sorting - b.sorting);
    return filteredNotes.map((note) => ({
      id: note.id,
      name: note.title,
      ...(note.is_folder && {
        children: convertNotesToTree(notes, note.id),
      }),
    }));
  }

  useEffect(() => {
    setDataForTreeView(convertNotesToTree(databaseNotes));
  }, [databaseNotes]);

  const handleRenameNode = (newName, nodeId) => {
    if (nodeId) {
      const updatedNote = databaseNotes.map((node) =>
        node.id === nodeId ? { ...node, title: newName } : node
      );
      setDatabaseNotes(updatedNote);
    }
  };

  const handleDragDrop = ({ dragIds, parentId, index }) => {
    moveNode({ dragIds, parentId, index });
  };

  const moveNode = ({ dragIds, parentId, index }) => {
    const draggedNode = databaseNotes.find((node) => node.id === dragIds[0]);

    if (!draggedNode || index < 0) {
      return;
    }

    const newSorting = index;
    const oldSorting = draggedNode.sorting;
    const newParentId = parentId;
    const oldParentId = draggedNode.parent_id;
    const filtered = databaseNotes.filter((note) => note.id !== dragIds[0]);

    if (parentId === oldParentId) {
      if (newSorting === oldSorting || index < 0) {
        return;
      }

      const sorted = filtered.map((note) => {
        const isIncreasing = newSorting > oldSorting;
        const isInRange = isIncreasing
          ? note.sorting < newSorting &&
            note.sorting > oldSorting &&
            note.parent_id === parentId
          : note.sorting >= newSorting &&
            note.sorting < oldSorting &&
            note.parent_id === parentId;

        draggedNode.sorting = isIncreasing ? index - 1 : index;

        return isInRange
          ? { ...note, sorting: isIncreasing ? note.sorting - 1 : note.sorting + 1 }
          : note;
      });

      setDatabaseNotes(sorted.concat(draggedNode));
    } else {
      draggedNode.parent_id = parentId;
      draggedNode.sorting = index;

      const sorted = filtered.map((note) => {
        if (note.parent_id === oldParentId && note.sorting > oldSorting) {
          return { ...note, sorting: note.sorting - 1 };
        } else if (note.parent_id === newParentId && note.sorting >= newSorting) {
          return { ...note, sorting: note.sorting + 1 };
        }
        return note;
      });

      setDatabaseNotes(sorted.concat(draggedNode));
    }
  };

  const openNote = () => {
    const note = databaseNotes.find((el) => el.id === hoveredNodeId);
    setActiveNote(note);
  };

  return (
    <>
      {!activeNote ? (
        <>
          <TreeView
            style={style}
            treeWidth={500}
            data={dataForTreeView}
            handleOnClick={openNote}
            handleRenameNode={handleRenameNode}
            hoveredNodeId={hoveredNodeId}
            selectedNodeId={selectedNodeId}
            handleDragDrop={handleDragDrop}
            setHoveredNodeId={setHoveredNodeId}
            setSelectedNodeId={setSelectedNodeId}
          />
        </>
      ) : (
        <div className={'bg-gray-200 p-6 rounded-lg relative'}>
          <Redactor
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            initId={'first'}
            classes={{
              title: 'bg-inherit font-bold',
              redactor: 'px-4 pt-4 pb-20 break-words rounded-lg bg-white m-4',
            }}
          />
          <button
            className={'bg-amber-500 px-4 py-2 rounded-lg text-white'}
            onClick={() =>
              setDatabaseNotes((prev) => {
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
              'bg-amber-500 px-4 py-[6px] text-lg rounded-full absolute right-3 top-3 text-white'
            }
            onClick={() => {
              setActiveNote(null);
              setSelectedNodeId(null);
            }}
          >
            x
          </button>
        </div>
      )}
    </>
  );
}

<Component />;
```

### **Custom SVG icons for files, folders and arrows and use Search**

```jsx
import React, { useState, useEffect } from 'react';
import { TreeView } from '@texttree/notepad-rcl';
import { initialData, style } from './data';

function Component() {
  const [term, setTerm] = useState('');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(initialData);
  const [dataForTreeView, setDataForTreeView] = useState(
    convertNotesToTree(databaseNotes)
  );

  function convertNotesToTree(notes, parentId = null) {
    const filteredNotes = notes.filter((note) => note.parent_id === parentId);

    filteredNotes.sort((a, b) => a.sorting - b.sorting);
    return filteredNotes.map((note) => ({
      id: note.id,
      name: note.title,
      ...(note.is_folder && {
        children: convertNotesToTree(notes, note.id),
      }),
    }));
  }

  useEffect(() => {
    setDataForTreeView(convertNotesToTree(databaseNotes));
  }, [databaseNotes]);

  const handleDeleteNode = ({ ids }) => {
    const updatedNote = databaseNotes.filter((el) => el.id !== ids[0]);
    setDatabaseNotes(updatedNote);
  };

  const handleRenameNode = (newName, nodeId) => {
    if (nodeId) {
      const updatedNote = databaseNotes.map((node) =>
        node.id === nodeId ? { ...node, title: newName } : node
      );
      setDatabaseNotes(updatedNote);
    }
  };

  const file = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );

  const openFolder = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
      />
    </svg>
  );

  const closeFolder = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
      />
    </svg>
  );

  const arrowRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );

  const arrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );

  const removeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const renameIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );

  const removeButton = { content: removeIcon, title: 'Remove node' };
  const renameButton = { content: renameIcon, title: 'Rename node' };

  const icons = {
    file,
    arrowDown,
    arrowRight,
    openFolder,
    closeFolder,
  };

  return (
    <div>
      <div>
        <div style={style.searchContainer}>
          <input
            type="text"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            style={style.searchInput}
            onClick={() => {
              setSelectedNodeId(null);
            }}
          />
          <label htmlFor="search" style={style.searchLabel}>
            Search
          </label>
        </div>

        <TreeView
          handleDeleteNode={handleDeleteNode}
          style={style}
          data={dataForTreeView}
          showRemoveButton={true}
          removeButton={removeButton}
          selectedNodeId={selectedNodeId}
          handleRenameNode={handleRenameNode}
          setSelectedNodeId={setSelectedNodeId}
          setHoveredNodeId={setHoveredNodeId}
          hoveredNodeId={hoveredNodeId}
          renameButton={renameButton}
          showRenameButton={true}
          treeWidth={500}
          icons={icons}
          term={term}
        />
      </div>
    </div>
  );
}

<Component />;
```
