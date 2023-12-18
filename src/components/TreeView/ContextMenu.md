### **Using a custom context menu**

```jsx
import React, { useState, useEffect } from 'react';
import { TreeView, ContextMenu } from '@texttree/notepad-rcl';
import { initialData } from './data';

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

function Component() {
  const [isVisible, setIsVisible] = useState(false);
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

  const handleContextMenu = (event) => {
    setIsVisible(true);
    setContextMenuEvent({ event });
  };

  const handleRename = () => currentNodeProps.node.edit();
  const handleDelete = () => currentNodeProps.tree.delete(currentNodeProps.node.id);
  const menuItems = [
    {
      id: 'rename',
      buttonContent: (
        <span className={'flex items-center gap-2'}>{renameIcon} Rename</span>
      ),
      action: handleRename,
    },
    { id: 'delete', buttonContent: '🗑️ Delete', action: handleDelete },
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
          treeWidth={500}
          data={dataForTreeView}
          hoveredNodeId={hoveredNodeId}
          selectedNodeId={selectedNodeId}
          handleRenameNode={handleRenameNode}
          setHoveredNodeId={setHoveredNodeId}
          setSelectedNodeId={setSelectedNodeId}
          handleContextMenu={handleContextMenu}
          getCurrentNodeProps={setCurrentNodeProps}
          handleDeleteNode={handleDeleteNode}
        />
        <ContextMenu
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          nodeProps={currentNodeProps}
          clickMenuEvent={contextMenuEvent}
          menuItems={menuItems}
          styles={{ menuWrapper: { zIndex: 50 } }}
          classes={{
            menuItem:
              'gap-2.5 py-1 pr-7 pl-2.5 cursor-pointer bg-gray-100 hover:bg-gray-200',
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
