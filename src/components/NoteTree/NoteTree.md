### **Save in Database**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { NoteTree, ContextMenu } from '@texttree/notepad-rcl';
import { initialData, style, initialData_2 } from './data';

function Component() {
  const treeRef = useRef(null);
  const [term, setTerm] = useState('');
  const [activeNote, setActiveNote] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [contextMenuEvent, setContextMenuEvent] = useState(null);
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(initialData);
  const [visualHierarchyData, setVisualHierarchyData] = useState(
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
    setVisualHierarchyData(convertNotesToTree(databaseNotes));
  }, [databaseNotes]);

  const handleTreeEventDelete = ({ ids }) => {
    const updatedNote = databaseNotes.filter((el) => el.id !== ids[0]);
    setDatabaseNotes(updatedNote); // идёт обновление БД
  };

  const handleRenameNode = (newName, nodeId) => {
    if (nodeId) {
      const updatedNote = databaseNotes.map((node) =>
        node.id === nodeId ? { ...node, title: newName } : node
      );
      setDatabaseNotes(updatedNote); // идёт обновление БД
    }
  };

  const handleNewDocument = () => {};

  const handleNewFolder = () => {};

  const handleDragDrop = ({ dragIds, parentId, index }) => {
    moveNode({ dragIds, parentId, index });

    setVisualHierarchyData(convertNotesToTree(databaseNotes));
  };

  const moveNode = ({ dragIds, parentId, index }) => {
    const draggedNode = databaseNotes.find((node) => node.id === dragIds[0]);

    if (draggedNode) {
      draggedNode.parent_id = parentId;

      let newSorting = index;
      if (newSorting >= draggedNode.sorting) {
        newSorting--;
      }
      draggedNode.sorting = newSorting;

      const sortedNodes = [...databaseNotes].sort((a, b) => a.sorting - b.sorting);

      let currentIndex = 0;
      for (let i = 0; i < sortedNodes.length; i++) {
        const node = sortedNodes[i];
        if (node.id !== draggedNode.id) {
          if (currentIndex === index) {
            currentIndex++;
          }
          node.sorting = currentIndex;
          currentIndex++;
        }
      }

      setDatabaseNotes(sortedNodes); // идёт обновление БД
    }
  };

  const handleContextMenu = (event) => {
    setSelectedNodeId(hoveredNodeId);
    setContextMenuEvent({ event });
  };

  const noteOnClick = () => {
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
                  currentNodeProps && currentNodeProps.tree.deselect(selectedNodeId);
                }}
              />
              <label htmlFor="search" style={style.searchLabel}>
                Search
              </label>
            </div>

            <NoteTree
              term={term}
              style={style}
              treeRef={treeRef}
              onClick={noteOnClick}
              hoveredNodeId={hoveredNodeId}
              handleDragDrop={handleDragDrop}
              handleRenameNode={handleRenameNode}
              setHoveredNodeId={setHoveredNodeId}
              setSelectedNodeId={setSelectedNodeId}
              handleContextMenu={handleContextMenu}
              visualHierarchyData={visualHierarchyData}
              getCurrentNodeProps={setCurrentNodeProps}
              handleTreeEventDelete={handleTreeEventDelete}
            />
            <ContextMenu
              setSelectedNodeId={setSelectedNodeId}
              currentNodeProps={currentNodeProps}
              onNewDocument={handleNewDocument}
              selectedNodeId={selectedNodeId}
              onNewFolder={handleNewFolder}
              data={contextMenuEvent}
              treeRef={treeRef}
              style={style}
            />

            <div className="flex justify-end">
              <button className="text-3xl bg-cyan-400 px-4 py-1 rounded-xl hover:bg-cyan-300">
                +
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveNote(!activeNote)}
              style={{ color: 'red', paddingRight: '30px' }}
            >
              Go Back
            </button>
            {selectedNodeId}
          </>
        )}
      </div>
    </div>
  );
}

<Component />;
```
