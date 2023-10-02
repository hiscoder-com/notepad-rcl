import React from 'react';
import { Tree } from 'react-arborist';

function NoteTree({
  handleTreeEventDelete,
  visualHierarchyData,
  getCurrentNodeProps,
  handleContextMenu,
  setHoveredNodeId,
  handleRenameNode,
  handleDragDrop,
  hoveredNodeId,
  treeRef,
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
        onContextMenu={handleContextMenu}
        onDelete={handleTreeEventDelete}
        data={visualHierarchyData}
        onMove={handleDragDrop}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
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
                backgroundColor: nodeProps.node.state.isSelected
                  ? style.nodeStyle.selectedColor
                  : nodeProps.node.id === hoveredNodeId
                  ? style.nodeStyle.hoveredColor
                  : style.nodeStyle.backgroundColor,
              }}
              onClick={() => {
                getCurrentNodeProps(nodeProps);
              }}
              onDoubleClick={() => nodeProps.node.isInternal && nodeProps.node.toggle()}
              onContextMenu={(event) => {
                event.preventDefault();
                nodeProps.node.select();
                nodeProps.node.tree.props.onContextMenu(event);
                getCurrentNodeProps(nodeProps);
              }}
              onMouseOver={() => {
                setHoveredNodeId(nodeProps.node.id);
              }}
              onMouseLeave={() => {
                setHoveredNodeId(null);
              }}
            >
              {isFile ? '🗎' : isFolderOpen ? '⏷ 🗁' : '⏵ 🗀'}{' '}
              <span className="node-text">
                {nodeProps.node.isEditing ? (
                  <input
                    type="text"
                    defaultValue={nodeProps.node.data.name}
                    onFocus={(e) => e.currentTarget.select()}
                    onBlur={() => nodeProps.node.reset()}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') nodeProps.node.reset();
                      if (e.key === 'Enter') {
                        nodeProps.node.submit(e.currentTarget.value);
                        handleRenameNode(e.currentTarget.value, nodeProps.node.id);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span>{nodeProps.node.data.name}</span>
                )}
              </span>
              <button onClick={() => nodeProps.node.edit()} title="Rename...">
                ✏️
              </button>
              <button
                onClick={() => nodeProps.tree.delete(nodeProps.node.id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          );
        }}
      </Tree>
    </div>
  );
}

export default NoteTree;
