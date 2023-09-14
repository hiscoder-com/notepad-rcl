import React, { useState } from 'react';
import { Tree } from 'react-arborist';

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

  const [data, setData] = useState(convertNotesToSampleData(notes));
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [term, setTerm] = useState();

  const handleDeleteNode = () => {
    if (selectedNodeId) {
      const updatedTreeData = removeNodeAndChildren(data, selectedNodeId);
      setData(updatedTreeData);
      setSelectedNodeId(null);
    }
  };

  // Recursive function to remove a node and its children
  const removeNodeAndChildren = (treeData, nodeId) => {
    return treeData.filter((node) => {
      if (node.id === nodeId) {
        if (node.children) {
          node.children.forEach((child) => {
            removeNodeAndChildren(treeData, child.id);
          });
        }
        return false;
      } else if (node.children) {
        node.children = removeNodeAndChildren(node.children, nodeId);
        return true;
      }
      return true;
    });
  };

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
  };

  // Recursive function to rename a node and its children
  const handleRenameNode = () => {
    if (selectedNodeId) {
      const newName = prompt('Enter a new name:', '');
      if (newName !== null) {
        const updatedTreeData = renameNode(data, selectedNodeId, newName);
        setData(updatedTreeData);
      }
    }
  };

  const renameNode = (treeData, nodeId, newName) => {
    return treeData.map((node) => {
      if (node.id === nodeId) {
        node.name = newName;
      }
      if (node.children) {
        node.children = renameNode(node.children, nodeId, newName);
      }
      return node;
    });
  };

  return (
    <div>
      <div
        style={{
          position: 'relative',
          marginBottom: '10px',
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
      <div style={{ marginBottom: '10px', color: 'red' }}>
        <button onClick={handleDeleteNode} disabled={!selectedNodeId}>
          Delete selected node
        </button>
      </div>
      <div style={{ marginBottom: '10px', color: 'blue' }}>
        <button onClick={handleRenameNode} disabled={!selectedNodeId}>
          Rename selected node
        </button>
      </div>

      <Tree
        data={data}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
      >
        {(nodeProps) => {
          const indent = nodeProps.node.level * 20;
          const isFolderOpen = nodeProps.node.isOpen;
          const isFile = nodeProps.node.isLeaf;

          return (
            <div
              style={{
                cursor: 'pointer',
                paddingLeft: `${indent}px`,
                backgroundColor:
                  nodeProps.node.id === selectedNodeId ? 'lightblue' : 'transparent',
                borderRadius: '5px',
                userSelect: 'none',
              }}
              onClick={() => {
                handleNodeClick(nodeProps.node.id);
              }}
              onDoubleClick={() => nodeProps.node.toggle()}
            >
              {isFile ? '🗎' : isFolderOpen ? '🗁' : '🗀'} {nodeProps.node.data.name}
            </div>
          );
        }}
      </Tree>
    </div>
  );
}

export default NoteTree;
