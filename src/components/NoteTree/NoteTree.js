import React from 'react';
import { Tree } from 'react-arborist';

function Node({ node, style, dragHandle }) {
  /* Customize the appearance of file nodes */
  return (
    <div onClick={() => node.toggle()}>
      {node.isLeaf ? '📄' : '🗀'} {node.data.name}
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

  const treeData = convertNotesToSampleData(notes);

  return (
    <Tree
      initialData={treeData}
      openByDefault={false} // To collapse all folders by default
    >
      {Node}
    </Tree>
  );
}

export default NoteTree;
