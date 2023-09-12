import React from 'react';
import { Tree } from 'react-arborist';

function NoteTree({ notes }) {
  function convertNotesToSampleData(notes) {
    // Function to find all children for a given parent_id
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

    // We start with the root elements whose parent_id is null
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

  const treeData = convertNotesToSampleData(notes);
  console.log(treeData);
  return <Tree initialData={treeData} />;
}

export default NoteTree;
