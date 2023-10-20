### **Using a custom context menu**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { TreeView, ContextMenu } from '@texttree/notepad-rcl';
import { initialData, style } from './data';

function Component() {
  const treeRef = useRef(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [contextMenuEvent, setContextMenuEvent] = useState(null);
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
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

  const handleContextMenu = (event) => {
    setSelectedNodeId((prevSelectedNodeId) => hoveredNodeId);
    setContextMenuEvent({ event });
  };

  const handleRename = () => {
    currentNodeProps.node.edit();
  };

  const handleDelete = () => {
    currentNodeProps.tree.delete(currentNodeProps.node.id);
  };

  const menuItems = [
    { id: 'rename', label: '✏️ Rename', action: handleRename },
    { id: 'delete', label: '🗑️ Delete', action: handleDelete },
  ];

  return (
    <div>
      <div>
        <TreeView
          style={style}
          treeHeight={450}
          treeWidth={500}
          treeRef={treeRef}
          data={dataForTreeView}
          customContextMenu={true}
          hoveredNodeId={hoveredNodeId}
          selectedNodeId={selectedNodeId}
          handleRenameNode={handleRenameNode}
          setHoveredNodeId={setHoveredNodeId}
          setSelectedNodeId={setSelectedNodeId}
          handleContextMenu={handleContextMenu}
          getCurrentNodeProps={setCurrentNodeProps}
          handleTreeEventDelete={handleTreeEventDelete}
        />
        <ContextMenu
          setSelectedNodeId={setSelectedNodeId}
          selectedNodeId={selectedNodeId}
          data={contextMenuEvent}
          menuItems={menuItems}
          treeRef={treeRef}
          style={style}
        />
      </div>
    </div>
  );
}

<Component />;
```
