import React, { useEffect, useState, useRef } from 'react';
import { Tree } from 'react-arborist';
import ContextMenu from './ContextMenu';

function NoteTree({ notes, style, handleNewDocument, handleNewFolder, indent = 20 }) {
  const treeRef = useRef(null);
  const [term, setTerm] = useState('');
  const [note, setNote] = useState(notes);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [objectForMenu, setObjectForMenu] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [data, setData] = useState(convertNotesToSampleData(note));

  useEffect(() => {
    setData(convertNotesToSampleData(note));
  }, [note]);

  function convertNotesToSampleData(notes, parentId = null) {
    const filteredNotes = notes.filter((note) => note.parent_id === parentId);

    filteredNotes.sort((a, b) => a.sorting - b.sorting);

    return filteredNotes.map((note) => ({
      id: note.id,
      name: note.title,
      ...(note.isFolder && {
        children: convertNotesToSampleData(notes, note.id),
      }),
    }));
  }

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

  const handleContextMenu = (event) => {
    let nodeIdToUse = null;
    if (hoveredNodeId !== null) {
      nodeIdToUse = hoveredNodeId;
    } else if (selectedNodeId !== null) {
      nodeIdToUse = selectedNodeId;
    }

    setSelectedNodeId(nodeIdToUse);
    setObjectForMenu({ event, nodeIdToUse });
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
          const isFolderOpen = nodeProps.node.isOpen;

          return (
            <div
              ref={nodeProps.dragHandle}
              style={{
                ...style.nodeStyle,
                paddingLeft: `${nodeProps.node.level * indent}px`,
                backgroundColor:
                  nodeProps.node.id === selectedNodeId
                    ? style.nodeStyle.selectedColor
                    : nodeProps.node.id === hoveredNodeId
                    ? style.nodeStyle.hoveredColor
                    : style.nodeStyle.backgroundColor,
              }}
              onClick={() => {
                setSelectedNodeId(nodeProps.node.id);
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
      <ContextMenu
        onNewDocument={handleNewDocument}
        onNewFolder={handleNewFolder}
        onRename={handleRenameNode}
        onDelete={handleDeleteNode}
        setSelectedNodeId={setSelectedNodeId}
        selectedNodeId={selectedNodeId}
        style={style}
        objectForMenu={objectForMenu}
        treeRef={treeRef}
      />
    </div>
  );
}

export default NoteTree;
