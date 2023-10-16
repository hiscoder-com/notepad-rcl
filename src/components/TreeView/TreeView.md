### **Saving to the database and using Drag and drop sorting**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { TreeView } from '@texttree/notepad-rcl';
import { initialData, style } from './data';

function Component() {
  const treeRef = useRef(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
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

  const handleDragDrop = ({ dragIds, parentId, index }) => {
    moveNode({ dragIds, parentId, index });
  };

  const moveNode = ({ dragIds, parentId, index }) => {
    const draggedNode = databaseNotes.find((node) => node.id === dragIds[0]);

    if (!draggedNode || index < 0) {
      return;
    }

    const newSorting = index;
    const oldSorting = draggedNode.sorting;
    const newParentId = parentId;
    const oldParentId = draggedNode.parent_id;
    const filtered = databaseNotes.filter((note) => note.id !== dragIds[0]);

    if (parentId === oldParentId) {
      if (newSorting === oldSorting || index < 0) {
        return;
      }

      const sorted = filtered.map((note) => {
        const isIncreasing = newSorting > oldSorting;
        const isInRange = isIncreasing
          ? note.sorting < newSorting &&
            note.sorting > oldSorting &&
            note.parent_id === parentId
          : note.sorting >= newSorting &&
            note.sorting < oldSorting &&
            note.parent_id === parentId;

        draggedNode.sorting = isIncreasing ? index - 1 : index;

        return isInRange
          ? { ...note, sorting: isIncreasing ? note.sorting - 1 : note.sorting + 1 }
          : note;
      });

      setDatabaseNotes(sorted.concat(draggedNode));
    } else {
      draggedNode.parent_id = parentId;
      draggedNode.sorting = index;

      const sorted = filtered.map((note) => {
        if (note.parent_id === oldParentId && note.sorting > oldSorting) {
          return { ...note, sorting: note.sorting - 1 };
        } else if (note.parent_id === newParentId && note.sorting >= newSorting) {
          return { ...note, sorting: note.sorting + 1 };
        }
        return note;
      });

      setDatabaseNotes(sorted.concat(draggedNode));
    }
  };

  return (
    <div>
      <div>
        <TreeView
          style={style}
          treeHeight={170}
          treeRef={treeRef}
          data={dataForTreeView}
          hoveredNodeId={hoveredNodeId}
          selectedNodeId={selectedNodeId}
          handleDragDrop={handleDragDrop}
          handleRenameNode={handleRenameNode}
          setHoveredNodeId={setHoveredNodeId}
          setSelectedNodeId={setSelectedNodeId}
          handleTreeEventDelete={handleTreeEventDelete}
        />
      </div>
    </div>
  );
}

<Component />;
```

### **Custom SVG icons for files, folders and arrows and use Search**

```jsx
import React, { useState, useEffect } from 'react';
import { TreeView } from '@texttree/notepad-rcl';
import { initialData, style } from './data';

function Component() {
  const [term, setTerm] = useState('');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
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

  const fileIcon = (
    <svg
      width="15"
      height="15"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4707 22.9981H9.9309V24.7005H14.4707V22.9981ZM1.70244 14.7696V10.2298H7.31844e-07V14.7696H1.70244ZM22.6992 14.2735V14.7696H24.4016V14.2735H22.6992ZM15.4822 4.11362L19.9753 8.15737L21.1141 6.89195L16.6212 2.84821L15.4822 4.11362ZM24.4016 14.2735C24.4016 12.3573 24.4188 11.144 23.9353 10.0584L22.3802 10.751C22.6821 11.4289 22.6992 12.2069 22.6992 14.2735H24.4016ZM19.9753 8.15737C21.5114 9.53984 22.0783 10.0731 22.3802 10.751L23.9353 10.0584C23.4518 8.97272 22.5385 8.17384 21.1141 6.89195L19.9753 8.15737ZM9.96472 2.00133C11.76 2.00133 12.4375 2.01447 13.0413 2.24617L13.6512 0.656739C12.6844 0.285743 11.6311 0.298886 9.96472 0.298886V2.00133ZM16.6212 2.84821C15.3886 1.7389 14.6179 1.02769 13.6512 0.656739L13.0413 2.24617C13.6453 2.47793 14.1547 2.91878 15.4822 4.11362L16.6212 2.84821ZM9.9309 22.9981C7.76674 22.9981 6.22924 22.9963 5.06289 22.8394C3.92101 22.686 3.26314 22.398 2.78281 21.9177L1.579 23.1216C2.42837 23.9709 3.50538 24.3478 4.83604 24.5268C6.1422 24.7023 7.81486 24.7005 9.9309 24.7005V22.9981ZM7.31844e-07 14.7696C7.31844e-07 16.8856 -0.00180379 18.5583 0.173797 19.8645C0.352701 21.1951 0.729644 22.2722 1.579 23.1216L2.78281 21.9177C2.30248 21.4374 2.01458 20.7795 1.86106 19.6377C1.70425 18.4713 1.70244 16.9338 1.70244 14.7696H7.31844e-07ZM14.4707 24.7005C16.5868 24.7005 18.2595 24.7023 19.5656 24.5268C20.8962 24.3478 21.9733 23.9709 22.8227 23.1216L21.6188 21.9177C21.1385 22.398 20.4806 22.686 19.3388 22.8394C18.1724 22.9963 16.6349 22.9981 14.4707 22.9981V24.7005ZM22.6992 14.7696C22.6992 16.9338 22.6974 18.4713 22.5405 19.6377C22.3871 20.7795 22.0991 21.4374 21.6188 21.9177L22.8227 23.1216C23.672 22.2722 24.0489 21.1951 24.2279 19.8645C24.4035 18.5583 24.4016 16.8856 24.4016 14.7696H22.6992ZM1.70244 10.2298C1.70244 8.06562 1.70425 6.52812 1.86106 5.36177C2.01458 4.2199 2.30248 3.56202 2.78281 3.08169L1.579 1.87789C0.729644 2.72726 0.352701 3.80427 0.173797 5.13493C-0.00180379 6.44108 7.31844e-07 8.11374 7.31844e-07 10.2298H1.70244ZM9.96472 0.298886C7.83733 0.298886 6.1565 0.297092 4.845 0.472614C3.50966 0.651336 2.42903 1.02787 1.579 1.87789L2.78281 3.08169C3.26248 2.60204 3.92238 2.31372 5.07083 2.16002C6.24313 2.00312 7.78936 2.00133 9.96472 2.00133V0.298886Z"
        fill="#292D32"
      />
      <path
        opacity="0.5"
        d="M5.39258 15.3379H14.4723"
        stroke="#292D32"
        strokeWidth="1.70244"
        strokeLinecap="round"
      />
      <path
        opacity="0.5"
        d="M5.39258 19.3105H11.6349"
        stroke="#292D32"
        strokeWidth="1.70244"
        strokeLinecap="round"
      />
      <path
        opacity="0.5"
        d="M13.3359 1.7168V4.5542C13.3359 7.22932 13.3359 8.56688 14.167 9.39794C14.9981 10.229 16.3356 10.229 19.0107 10.229H23.5506"
        stroke="#292D32"
        strokeWidth="1.70244"
      />
    </svg>
  );

  const openFolderIcon = (
    <svg
      width="15"
      height="15"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.4605 15.093L23.0065 20.7678C22.8363 22.5043 22.7001 23.8322 19.6243 23.8322H5.34658C2.27084 23.8322 2.13464 22.5043 1.9644 20.7678L1.51041 15.093C1.41962 14.151 1.71471 13.2771 2.24814 12.6075C2.25949 12.5961 2.25949 12.5961 2.27084 12.5848C2.89506 11.8243 3.83708 11.3477 4.89259 11.3477H20.0783C21.1338 11.3477 22.0645 11.8243 22.6774 12.5621C22.6887 12.5734 22.7001 12.5848 22.7001 12.5961C23.2562 13.2657 23.5626 14.1397 23.4605 15.093Z"
        stroke="#292D32"
        strokeWidth="1.70244"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.4"
        d="M2.83789 11.8366V5.99155C2.83789 2.13268 3.80261 1.16797 7.66147 1.16797H9.10287C10.5443 1.16797 10.8734 1.59925 11.4182 2.32563L12.8596 4.25506C13.2228 4.73174 13.4384 5.02683 14.4031 5.02683H17.2973C21.1561 5.02683 22.1209 5.99155 22.1209 9.85041V11.882"
        stroke="#292D32"
        strokeWidth="1.70244"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M9.56836 18.1582H15.4021"
        stroke="#292D32"
        strokeWidth="1.70244"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const closeFolderIcon = (
    <svg
      width="15"
      height="15"
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M15.6318 15.3926H9.95703"
        stroke="#292D32"
        strokeWidth="1.70244"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.2226 11.365V18.1748C24.2226 22.7146 23.0877 23.8496 18.5478 23.8496H7.19824C2.6584 23.8496 1.52344 22.7146 1.52344 18.1748V6.82519C1.52344 2.28535 2.6584 1.15039 7.19824 1.15039H8.90068C10.6031 1.15039 10.9777 1.64977 11.6246 2.51234L13.327 4.78226C13.7583 5.34974 14.008 5.69023 15.143 5.69023H18.5478C23.0877 5.69023 24.2226 6.82519 24.2226 11.365Z"
        stroke="#292D32"
        strokeWidth="1.70244"
        strokeMiterlimit="10"
      />
    </svg>
  );

  const arrowRight = (
    <svg
      width="11"
      height="11"
      viewBox="0 0 7 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25391 9.74805L5.52295 5.5078L1.26828 1.25313"
        stroke="#353535"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const arrowDown = (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5L5.24747 5.76186L9.49493 1.5"
        stroke="#353535"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const removeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="18"
      height="18"
      viewBox="0 0 48 48"
    >
      <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
    </svg>
  );

  const renameIcon = (
    <svg
      width="17"
      height="17"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.75 2C11.3358 2 11 2.33579 11 2.75C11 3.16421 11.3358 3.5 11.75 3.5H13.25V24.5H11.75C11.3358 24.5 11 24.8358 11 25.25C11 25.6642 11.3358 26 11.75 26H16.25C16.6642 26 17 25.6642 17 25.25C17 24.8358 16.6642 24.5 16.25 24.5H14.75V3.5H16.25C16.6642 3.5 17 3.16421 17 2.75C17 2.33579 16.6642 2 16.25 2H11.75Z"
        fill="#212121"
      />
      <path
        d="M6.25 6.01958H12.25V7.51958H6.25C5.2835 7.51958 4.5 8.30308 4.5 9.26958V18.7696C4.5 19.7361 5.2835 20.5196 6.25 20.5196H12.25V22.0196H6.25C4.45507 22.0196 3 20.5645 3 18.7696V9.26958C3 7.47465 4.45507 6.01958 6.25 6.01958Z"
        fill="#212121"
      />
      <path
        d="M21.75 20.5196H15.75V22.0196H21.75C23.5449 22.0196 25 20.5645 25 18.7696V9.26958C25 7.47465 23.5449 6.01958 21.75 6.01958H15.75V7.51958H21.75C22.7165 7.51958 23.5 8.30308 23.5 9.26958V18.7696C23.5 19.7361 22.7165 20.5196 21.75 20.5196Z"
        fill="#212121"
      />
    </svg>
  );

  const removeButton = { content: removeIcon, title: 'Remove node' };
  const renameButton = { content: renameIcon, title: 'Rename node' };

  return (
    <div>
      <div>
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

        <TreeView
          style={style}
          fileIcon={fileIcon}
          data={dataForTreeView}
          arrowRight={arrowRight}
          showDeleteButton={true}
          removeButton={removeButton}
          selectedNodeId={selectedNodeId}
          closeFolderIcon={closeFolderIcon}
          handleRenameNode={handleRenameNode}
          handleTreeEventDelete={handleTreeEventDelete}
          setSelectedNodeId={setSelectedNodeId}
          setHoveredNodeId={setHoveredNodeId}
          openFolderIcon={openFolderIcon}
          hoveredNodeId={hoveredNodeId}
          renameButton={renameButton}
          showRenameButton={true}
          removeIcon={removeIcon}
          arrowDown={arrowDown}
          treeHeight={170}
          term={term}
        />
      </div>
    </div>
  );
}

<Component />;
```
