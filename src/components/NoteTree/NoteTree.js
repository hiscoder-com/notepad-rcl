import React, { useRef, useState } from 'react';
import { Tree } from 'react-arborist';

function Node({ node }) {
  const indent = node.level * 20;
  const isFolderOpen = node.isOpen; // State Properties, Returns true if node is internal and in an open state.
  const isFile = node.isLeaf; // State Properties, Returns true if the children property is not an array.

  const handleRename = () => {
    const newName = prompt('Введите новое имя узла:', node.data.name);
    if (newName !== null && newName !== node.data.name) {
      node.onRename(newName, node.id);
    }
  };

  return (
    <div
      style={{
        paddingLeft: `${indent}px`,
        cursor: 'pointer',
        backgroundColor: node.isSelected ? 'lightblue' : 'transparent', // State Properties, Returns true if node is selected.
        borderRadius: '5px',
      }}
      onClick={() => node.toggle()} // Open/Close Methods, Toggles the open/closed state of the node if it is an internal node.
      onDoubleClick={handleRename}
    >
      {isFile ? '🗎' : isFolderOpen ? '🗁' : '🗀'} {node.data.name}
    </div>
  );
}

function NoteTree({ notes }) {
  function convertNotesToSampleData(notes) {
    function findChildren(id) {
      const children = [];
      notes.forEach((note) => {
        if (note.parent_id === id) {
          const child = { id: note.id, name: note.title };
          if (note.isFolder) {
            child.children = findChildren(note.id);
          }
          children.push(child);
        }
      });
      return children;
    }

    const resultArray = [];
    notes.forEach((note) => {
      if (note.parent_id === null) {
        const item = { id: note.id, name: note.title };
        if (note.isFolder) {
          item.children = findChildren(note.id);
        }
        resultArray.push(item);
      }
    });

    return resultArray;
  }

  const [treeData, setTreeData] = useState(convertNotesToSampleData(notes));
  const [term, setTerm] = useState();
  const onRename = (newName, nodeId) => {
    const updatedData = treeData.map((node) => {
      if (node.id === nodeId) {
        return { ...node, name: newName };
      }
      return node;
    });

    setTreeData(updatedData);
  };
  return (
    <div>
      <div
        style={{
          position: 'relative',
          marginBottom: '36px',
          maxWidth: '300px',
        }}
      >
        <input
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          style={{
            border: '0',
            borderBottom: '1px solid #555',
            background: 'transparent',
            width: '100%',
            padding: '24px 0 5px 0',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <label
          htmlFor="search"
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            fontSize: '14px',
            color: '#555',
            transition: 'all 0.5s ease-in-out',
          }}
        >
          Search
        </label>
      </div>
      <Tree
        data={treeData}
        onRename={onRename}
        openByDefault={false}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
      >
        {Node}
      </Tree>
    </div>
  );
}

export default NoteTree;
