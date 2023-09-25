import React, { useEffect, useState, useRef } from 'react';
import { Tree } from 'react-arborist';

function NoteTree({ notes, style }) {
  const treeRef = useRef(null);
  const [term, setTerm] = useState('');
  const [data, setData] = useState(notes);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeIdToUse, setNodeIdToUse] = useState(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
    hideContextMenu();
  };

  const handleTreeEventDelete = ({ ids }) => {
    const updatedTreeData = removeNodeAndChildren(data, ids[0]);
    setData(updatedTreeData);
  };

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

  const handleRenameNode = () => {
    if (selectedNodeId) {
      const nodeToRename = findNodeById(data, selectedNodeId);
      if (nodeToRename) {
        const newName = prompt('Enter a new name:', nodeToRename.name);
        if (newName !== null) {
          const updatedTreeData = renameNodeInTree(data, selectedNodeId, newName);
          setData(updatedTreeData);
        }
      }
    }
  };

  const findNodeById = (treeData, nodeId) => {
    for (const node of treeData) {
      if (node.id === nodeId) {
        return node;
      }
      if (node.children) {
        const foundNode = findNodeById(node.children, nodeId);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  };

  const renameNodeInTree = (treeData, nodeId, newName) => {
    return treeData.map((node) => {
      if (node.id === nodeId) {
        node.name = newName;
      }
      if (node.children) {
        node.children = renameNodeInTree(node.children, nodeId, newName);
      }
      return node;
    });
  };

  const handleScroll = () => {
    hideContextMenu();
  };

  const handleOutsideClick = (event) => {
    if (treeRef.current && !treeRef.current.contains(event.target)) {
      setSelectedNodeId(null);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedNodeId]);

  const handleContextMenu = (event) => {
    let nodeIdToUse = null;
    if (hoveredNodeId !== null) {
      nodeIdToUse = hoveredNodeId;
    } else if (selectedNodeId !== null) {
      nodeIdToUse = selectedNodeId;
    }

    setSelectedNodeId(nodeIdToUse);
    setNodeIdToUse(nodeIdToUse); // передаём ID в контекстное меню
    showContextMenu(event, nodeIdToUse);
  };

  const showContextMenu = (event, nodeId) => {
    if (nodeId) {
      setContextMenuVisible(true);
      setContextMenuPosition({ top: event.clientY, left: event.clientX });
    }
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleNewDocument = () => {
    hideContextMenu();
  };

  const handleNewFolder = () => {
    hideContextMenu();
  };

  const handleRename = () => {
    hideContextMenu();
  };

  const handleDelete = () => {
    hideContextMenu();
  };

  // console.log({ hoveredNodeId, selectedNodeId });

  return (
    <div
      style={{ padding: '50px' }}
      ref={treeRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
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
      <button
        onClick={handleDeleteNode}
        disabled={!selectedNodeId}
        style={style.buttonRemoveContainer}
      >
        Delete selected node
      </button>
      <button
        onClick={handleRenameNode}
        disabled={!selectedNodeId}
        style={style.buttonRenameContainer}
      >
        Rename selected node
      </button>

      <Tree
        data={data}
        searchTerm={term}
        onDelete={handleTreeEventDelete}
        onContextMenu={handleContextMenu}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
      >
        {(nodeProps) => {
          const isFile = nodeProps.node.isLeaf;
          const indent = nodeProps.node.level * 20;
          const isFolderOpen = nodeProps.node.isOpen;

          return (
            <div
              style={{
                cursor: 'pointer',
                paddingLeft: `${indent}px`,
                backgroundColor:
                  nodeProps.node.id === selectedNodeId
                    ? 'lightblue'
                    : nodeProps.node.id === hoveredNodeId
                    ? 'lightyellow'
                    : 'transparent',
                borderRadius: '5px',
                userSelect: 'none',
              }}
              onClick={() => {
                handleNodeClick(nodeProps.node.id);
              }}
              onDoubleClick={() => nodeProps.node.toggle()}
              onContextMenu={(event) => {
                event.preventDefault();
                nodeProps.node.tree.props.onContextMenu(event);
              }}
              onMouseOver={() => {
                setHoveredNodeId(nodeProps.node.id);
              }}
              onMouseLeave={() => {
                setHoveredNodeId(null);
              }}
            >
              {isFile ? '🗎' : isFolderOpen ? '🗁' : '🗀'} {nodeProps.node.data.name}
            </div>
          );
        }}
      </Tree>
      {contextMenuVisible && (
        <div
          style={{
            position: 'fixed',
            top: contextMenuPosition.top + 'px',
            left: contextMenuPosition.left + 'px',
            zIndex: 1000,
          }}
        >
          <ContextMenu
            onNewDocument={handleNewDocument}
            onNewFolder={handleNewFolder}
            onRename={handleRename}
            onDelete={handleDelete}
            nodeId={nodeIdToUse}
            style={style}
          />
        </div>
      )}
    </div>
  );
}

export default NoteTree;

function ContextMenu({ onNewDocument, onNewFolder, onRename, onDelete, nodeId, style }) {
  return (
    <div style={style.contextMenuContainer}>
      <div style={style.contextMenuItem} onClick={onNewDocument}>
        {nodeId ? <span>✅ {nodeId} ✅</span> : <span>❌ No nodeId! ❌</span>}
      </div>
      <div style={style.contextMenuItem} onClick={onNewDocument}>
        <span>📄 New document</span>
      </div>
      <div style={style.contextMenuItem} onClick={onNewFolder}>
        <span>📁 New folder</span>
      </div>
      <div style={style.contextMenuItem} onClick={onRename}>
        <span>✏️ Rename</span>
      </div>
      <div style={style.contextMenuItem} onClick={onDelete}>
        <span>🗑️ Delete</span>
      </div>
    </div>
  );
}
