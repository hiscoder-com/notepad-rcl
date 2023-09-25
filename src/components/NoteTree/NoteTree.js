import React, { useEffect, useState, useRef } from 'react';
import { Tree } from 'react-arborist';

function NoteTree({ notes, style }) {
  const treeRef = useRef(null);
  const [term, setTerm] = useState('');
  const [note, setNote] = useState(notes);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeIdToUse, setNodeIdToUse] = useState(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

  function convertNotesToSampleData(notes) {
    function findChildren(id) {
      return notes
        .filter((note) => note.parent_id === id)
        .sort((a, b) => a.sorting - b.sorting)
        .map((note) => ({
          id: note.id,
          name: note.title,
          children: note.isFolder ? findChildren(note.id) : undefined,
        }));
    }

    return notes
      .filter((note) => note.parent_id === null)
      .sort((a, b) => a.sorting - b.sorting)
      .map((note) => ({
        id: note.id,
        name: note.title,
        children: note.isFolder ? findChildren(note.id) : undefined,
      }));
  }

  const [data, setData] = useState(convertNotesToSampleData(note));

  useEffect(() => {
    setData(convertNotesToSampleData(note));
  }, [note]);

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
    hideContextMenu();
  };

  const handleTreeEventDelete = ({ ids }) => {
    const updatedNote = note.filter((el) => el.id !== ids[0]);
    setNote(updatedNote);

    const updatedData = removeNodeFromData(data, ids[0]);
    setData(updatedData);
  };

  const handleDeleteNode = () => {
    if (selectedNodeId) {
      const updatedNote = note.filter((el) => el.id !== selectedNodeId);
      setNote(updatedNote);

      const updatedData = removeNodeFromData(data, selectedNodeId);
      setData(updatedData);

      setSelectedNodeId(null);
    }
  };

  const removeNodeFromData = (treeData, nodeId) => {
    return treeData.filter((node) => {
      if (node.id === nodeId) {
        return false;
      } else if (node.children) {
        node.children = removeNodeFromData(node.children, nodeId);
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
          const updatedNote = renameNodeInNote(note, selectedNodeId, newName);
          setNote(updatedNote);

          const updatedData = renameNodeInTree(data, selectedNodeId, newName);
          setData(updatedData);
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

  const renameNodeInNote = (noteData, nodeId, newName) => {
    return noteData.map((node) => {
      if (node.id === nodeId) {
        node.title = newName;
      }
      return node;
    });
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
      hideContextMenu();
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
    setNodeIdToUse(nodeIdToUse);
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
    handleRenameNode();
    hideContextMenu();
  };

  const handleDelete = () => {
    handleDeleteNode();
    hideContextMenu();
  };

  const onMove = ({ dragIds, parentId, index }) => {
    moveNode({ dragIds, parentId, index });
    updateDataFromNote();
  };

  const moveNode = ({ dragIds, parentId, index }) => {
    const draggedNode = note.find((node) => node.id === dragIds[0]);

    if (draggedNode) {
      draggedNode.parent_id = parentId;

      let newSorting = index;
      if (newSorting >= draggedNode.sorting) {
        newSorting--;
      }
      draggedNode.sorting = newSorting;

      const sortedNodes = [...note].sort((a, b) => a.sorting - b.sorting);

      let currentIndex = 0;
      for (const node of sortedNodes) {
        if (node.id !== draggedNode.id) {
          if (currentIndex === index) {
            currentIndex++;
          }
          node.sorting = currentIndex;
          currentIndex++;
        }
      }

      setNote(sortedNodes);
    }
  };

  const updateDataFromNote = () => {
    const newData = convertNotesToSampleData(note);
    setData(newData);
  };

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
        onMove={onMove}
      >
        {(nodeProps) => {
          const isFile = nodeProps.node.isLeaf;
          const indent = nodeProps.node.level * 20;
          const isFolderOpen = nodeProps.node.isOpen;

          return (
            <div
              ref={nodeProps.dragHandle}
              style={{
                cursor: 'pointer',
                paddingLeft: `${indent}px`,
                backgroundColor:
                  nodeProps.node.id === selectedNodeId
                    ? '#FFB703'
                    : nodeProps.node.id === hoveredNodeId
                    ? '#FFF5DD'
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

function MenuItem({ onClick, itemId, hoveredItemId, style, children, handleMouseEnter }) {
  const isHovered = itemId === hoveredItemId;

  return (
    <div
      style={{
        ...style.contextMenuItem,
        backgroundColor: isHovered ? '#EDEDED' : 'transparent',
      }}
      onClick={onClick}
      onMouseEnter={() => handleMouseEnter(itemId)}
      onMouseLeave={() => handleMouseEnter(null)}
    >
      {children}
    </div>
  );
}

function ContextMenu({ onNewDocument, onNewFolder, onRename, onDelete, nodeId, style }) {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const menuItems = [
    { id: 'newDocument', label: '📄 New document', action: onNewDocument },
    { id: 'newFolder', label: '📁 New folder', action: onNewFolder },
    { id: 'rename', label: '✏️ Rename', action: onRename },
    { id: 'delete', label: '🗑️ Delete', action: onDelete },
  ];

  return (
    <div style={style.contextMenuContainer}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          itemId={item.id}
          hoveredItemId={hoveredItemId}
          onClick={item.action}
          style={style}
          handleMouseEnter={handleMouseEnter}
        >
          <span>{item.label}</span>
        </MenuItem>
      ))}
    </div>
  );
}
