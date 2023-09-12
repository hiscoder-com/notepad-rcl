import React from 'react';
import { Tree } from 'react-arborist';

function NoteTree({ notes }) {
  function convertNotesToSampleData(notes) {
    const resultArray = [];
    const childrenArrays = new Map();

    notes.forEach((note) => {
      const { id, title, parent_id, isFolder } = note;

      // Обработка обычной заметки
      if (!isFolder) {
        // Заметка без родителя, добавляем в корень resultArray
        if (parent_id === null) {
          resultArray.push({ id, name: title });
        } else {
          // Проверяем, есть ли массив children для данного parent_id
          if (!childrenArrays.has(parent_id)) {
            childrenArrays.set(parent_id, []);
          }
          // Добавляем заметку в массив children
          childrenArrays.get(parent_id).push({ id, name: title });
        }
      }
      // Обработка папки
      else {
        // Папка без родителя, добавляем в корень resultArray
        if (parent_id === null) {
          resultArray.push({ id, name: title, children: [] });
        } else {
          // Проверяем, есть ли массив children для данного parent_id
          if (!childrenArrays.has(parent_id)) {
            childrenArrays.set(parent_id, []);
          }
          // Добавляем папку в массив children
          childrenArrays.get(parent_id).push({ id, name: title, children: [] });
        }
      }
    });

    // Связываем папки и заметки
    childrenArrays.forEach((children, parent_id) => {
      const parentIndex = resultArray.findIndex((item) => item.id === parent_id);
      if (parentIndex !== -1) {
        resultArray[parentIndex].children = children;
      }
    });

    return resultArray;
  }

  const treeData = convertNotesToSampleData(notes);
  console.log(treeData);
  return <Tree initialData={treeData} />;
}

export default NoteTree;
