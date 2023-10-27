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
      ...(note.is_folder && {
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
    setSelectedNodeId(hoveredNodeId);
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
          classes={{
            nodeWrapper:
              'flex px-5 leading-[47px] cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200',
            nodeTextBlock: 'items-center',
          }}
          nodeHeight={57}
          treeWidth={500}
          treeHeight={450}
          treeRef={treeRef}
          data={dataForTreeView}
          customContextMenu={true}
          hoveredNodeId={hoveredNodeId}
          selectedNodeId={selectedNodeId}
          handleRenameNode={handleRenameNode}
          setHoveredNodeId={setHoveredNodeId}
          setSelectedNodeId={setSelectedNodeId}
          handleContextMenu={handleContextMenu}
          getCurrentNodeProps={setCurrentNodeProps} //
          handleTreeEventDelete={handleTreeEventDelete}
        />
        <ContextMenu
          setSelectedNodeId={setSelectedNodeId}
          selectedNodeId={selectedNodeId}
          data={contextMenuEvent}
          menuItems={menuItems}
          treeRef={treeRef}
          classes={{
            menuItem: 'py-1 pr-7 pl-2.5 cursor-pointer bg-gray-100 hover:bg-gray-200',
            menuWrapper: 'fixed z-50',
            menuContainer:
              'absolute border rounded z-[100] whitespace-nowrap bg-white shadow',
            emptyMenu: 'p-2.5 cursor-pointer text-gray-300',
          }}
        />
      </div>
    </div>
  );
}

<Component />;
```
