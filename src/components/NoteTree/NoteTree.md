### **Save in Database**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { NoteTree, ContextMenu } from '@texttree/notepad-rcl';

function Component() {
  const treeRef = useRef(null);
  const [term, setTerm] = useState('');
  const [activeNote, setActiveNote] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [objectForMenu, setObjectForMenu] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState([
    {
      id: 'first_note_key_from_DB',
      title: 'note1',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 0,
    },
    {
      id: 'sixth_note_key_from_DB',
      title: 'note2',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 1,
    },
    {
      id: 'seven_note_key_from_DB',
      title: 'note3',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 2,
    },
    {
      id: 'eight_note_key_from_DB',
      title: 'note4',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 3,
    },
    {
      id: 'nineth_note_key_from_DB',
      title: 'note5',
      data: {
        time: 1550476186479,
        blocks: [
          {
            id: 'zbGZFPM-iI',
            type: 'paragraph',
            data: {
              text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
            },
          },
        ],
        version: '2.27.2',
      },
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: false,
      parent_id: null,
      sorting: 4,
    },
    {
      id: 'first_folder_key_from_DB',
      title: 'folder1',
      created_at: new Date('2022-10-15 07:59:58.3642'),
      isFolder: true,
      parent_id: null,
      sorting: 5,
    },
    // {
    //   id: 'test_note_key_from_DB',
    //   title: 'note6',
    //   data: {
    //     time: 1550476186479,
    //     blocks: [
    //       {
    //         id: 'zbGZFPM-iI',
    //         type: 'paragraph',
    //         data: {
    //           text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
    //         },
    //       },
    //     ],
    //     version: '2.27.2',
    //   },
    //   created_at: new Date('2022-10-15 07:59:58.3642'),
    //   isFolder: false,
    //   parent_id: 'first_folder_key_from_DB',
    //   sorting: 0,
    // },
    // {
    //   id: 'test2_folder_key_from_DB',
    //   title: 'folder2',
    //   created_at: new Date('2022-10-15 07:59:58.3642'),
    //   isFolder: true,
    //   parent_id: 'first_folder_key_from_DB',
    //   sorting: 1,
    // },
  ]);
  const [visualHierarchyData, setVisualHierarchyData] = useState(
    convertNotesToTree(databaseNotes)
  );

  const style = {
    searchContainer: {
      position: 'relative',
      marginBottom: '10px',
      maxWidth: '320px',
    },
    nodeStyle: {
      cursor: 'pointer',
      borderRadius: '5px',
      userSelect: 'none',
      selectedColor: '#FFB703',
      hoveredColor: '#FFF5DD',
      backgroundColor: 'transparent',
    },
    searchInput: {
      border: '0',
      borderBottom: '1px solid #555',
      background: 'transparent',
      width: '100%',
      padding: '24px 0 5px 0',
      fontSize: '14px',
      outline: 'none',
    },
    searchLabel: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      fontSize: '14px',
      color: '#555',
      transition: 'all 0.5s ease-in-out',
    },
    buttonRemoveContainer: {
      marginBottom: '10px',
      marginRight: '10px',
      color: '#EB5E28',
    },
    contextMenuContainer: {
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
      zIndex: '100',
      whiteSpace: 'nowrap',
    },
    contextMenuItem: {
      padding: '4px 30px 4px 10px',
      cursor: 'pointer',
      hoveredColor: '#EDEDED',
      backgroundColor: 'transparent',
    },
    contextMenuWrapperStyle: { position: 'fixed', zIndex: 50 },
  };

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

  const handleTreeEventDelete = ({ ids }) => {
    const updatedNote = databaseNotes.filter((el) => el.id !== ids[0]);
    setDatabaseNotes(updatedNote); // идёт обновление БД

    const updatedData = removeNodeFromData(visualHierarchyData, ids[0]);
    setVisualHierarchyData(updatedData);
  };

  useEffect(() => {
    if (currentNodeProps) {
      currentNodeProps.node.isSelected && setSelectedNodeId(currentNodeProps.node.id);
    }
  }, [currentNodeProps]);

  const handleDeleteNode = () => {
    if (selectedNodeId) {
      const updatedNote = databaseNotes.filter((el) => el.id !== selectedNodeId);
      setDatabaseNotes(updatedNote); // идёт обновление БД

      const updatedData = removeNodeFromData(visualHierarchyData, selectedNodeId);
      setVisualHierarchyData(updatedData);

      setSelectedNodeId(null);
    }
  };

  const handleNewDocument = () => {};

  const handleNewFolder = () => {};

  const handleRenameNode = (newName, nodeId) => {
    if (nodeId) {
      const updatedNote = databaseNotes.map((node) =>
        node.id === nodeId ? { ...node, title: newName } : node
      );
      setDatabaseNotes(updatedNote);
    }
  };

  const onMove = ({ dragIds, parentId, index }) => {
    moveNode({ dragIds, parentId, index });
    updateDataFromNote();
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

  const updateDataFromNote = () => {
    const newData = convertNotesToTree(databaseNotes);
    setVisualHierarchyData(newData);
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

            <button
              onClick={handleDeleteNode}
              disabled={!selectedNodeId}
              style={style.buttonRemoveContainer}
            >
              Delete selected node
            </button>

            <NoteTree
              setCurrentNodeProps={setCurrentNodeProps}
              term={term}
              style={style}
              onMove={onMove}
              treeRef={treeRef}
              databaseNotes={databaseNotes}
              hoveredNodeId={hoveredNodeId}
              setHoveredNodeId={setHoveredNodeId}
              handleContextMenu={handleContextMenu}
              visualHierarchyData={visualHierarchyData}
              handleTreeEventDelete={handleTreeEventDelete}
              handleRenameNode={handleRenameNode}
            />
            <ContextMenu
              currentNodeProps={currentNodeProps}
              setSelectedNodeId={setSelectedNodeId}
              onNewDocument={handleNewDocument}
              selectedNodeId={selectedNodeId}
              objectForMenu={objectForMenu}
              onNewFolder={handleNewFolder}
              onDelete={handleDeleteNode}
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
          <div>test</div>
        )}
      </div>
    </div>
  );
}

<Component />;
```
