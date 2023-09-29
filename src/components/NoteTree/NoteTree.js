import React from 'react';
import { Tree } from 'react-arborist';

function NoteTree({
  handleTreeEventDelete,
  visualHierarchyData,
  handleContextMenu,
  setHoveredNodeId,
  hoveredNodeId,
  onSelect,
  treeRef,
  onMove,
  style,
  term,
  onUpdate,
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
        searchTerm={term}
        onMove={onMove}
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
                onSelect(nodeProps.node);
              }}
              onDoubleClick={() => nodeProps.node.isInternal && nodeProps.node.toggle()}
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
                        // console.log(nodeProps.node.tree.props.data);
                        onUpdate(e.currentTarget.value);
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
