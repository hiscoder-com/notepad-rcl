import React from 'react';
import { Tree } from 'react-arborist';

function NoteTree({
  handleTreeEventDelete,
  visualHierarchyData,
  handleContextMenu,
  setHoveredNodeId,
  selectedNodeId,
  hoveredNodeId,
  onSelect,
  treeRef,
  onMove,
  style,
  term,
  indent = 20,
}) {
  return (
    <div
      ref={treeRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Tree
        data={visualHierarchyData}
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
                onSelect(nodeProps.node);
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
    </div>
  );
}

export default NoteTree;
