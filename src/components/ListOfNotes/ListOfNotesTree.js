/* eslint-disable no-alert, no-console, react/no-find-dom-node */
import React, { useEffect, useState } from 'react';
import 'rc-tree/assets/index.css';

import Tree from 'rc-tree';

function ListOfNotesTree({ notes, setNodeId }) {
  const [data, setData] = useState([]);

  const makeTree = (id, parentBC, notes) =>
    notes
      .filter(({ parent_id }) => parent_id == id)
      .map(({ id, title, ...other }) => ({
        id,
        key: id,
        ...other,
        title,
        parentBC,
        children: makeTree(id, parentBC + '/' + title, notes),
      }));

  console.log(data);
  useEffect(() => {
    const tree = makeTree(null, '', notes);

    setData(tree);
  }, [notes]);

  const onDrop = (info) => {
    console.log('drop', info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item?.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item?.children) {
          loop(item?.children, key, callback);
        }
      });
    };
    const _data = [...data];

    // Find dragObject
    let dragObj;
    loop(_data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (dropPosition === 0) {
      // Drop on the content
      loop(_data, dropKey, (item) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children;
        // where to insert 示例添加到尾部，可以是随意位置
        item?.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap (insert before or insert after)
      let ar;
      let i;
      loop(_data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar?.splice(i, 0, dragObj);
      } else {
        ar?.splice(i + 1, 0, dragObj);
      }
    }

    setData(_data);
  };
  return (
    <div style={{ margin: '0 20px' }}>
      <h2>simple</h2>
      <input aria-label="good" />

      {data?.length && (
        <Tree
          onSelect={(e) => setNodeId(e)}
          className="myCls"
          showLine
          draggable
          onDrop={onDrop}
          selectable={true}
          treeData={data}
        />
      )}
    </div>
  );
}

export default ListOfNotesTree;
