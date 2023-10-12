### **Save in Database**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { TreeView } from '@texttree/notepad-rcl';
import { initialData, style } from './data';

function Component() {
  const treeRef = useRef(null);
  const [term, setTerm] = useState('');
  const [activeNote, setActiveNote] = useState(false);
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
      ...(note.isFolder && {
        children: convertNotesToTree(notes, note.id),
      }),
    }));
  }

  useEffect(() => {
    setDataForTreeView(convertNotesToTree(databaseNotes));
  }, [databaseNotes]);

  const handleTreeEventDelete = ({ ids }) => {
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

  const nodeOnDoubleClick = () => {
    setActiveNote(true);
  };

  return (
    <div>
      <div>
        {!activeNote ? (
          <>
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
              term={term}
              style={style}
              treeHeight={170}
              treeRef={treeRef}
              data={dataForTreeView}
              hoveredNodeId={hoveredNodeId}
              selectedNodeId={selectedNodeId}
              handleDragDrop={handleDragDrop}
              onDoubleClick={nodeOnDoubleClick}
              handleRenameNode={handleRenameNode}
              setHoveredNodeId={setHoveredNodeId}
              setSelectedNodeId={setSelectedNodeId}
              handleTreeEventDelete={handleTreeEventDelete}
            />
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveNote(!activeNote)}
              style={{ color: 'red', paddingRight: '30px' }}
            >
              Go Back
            </button>
            The note is ready to reveal its secrets!
          </>
        )}
      </div>
    </div>
  );
}

<Component />;
```
