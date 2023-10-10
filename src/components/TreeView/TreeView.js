import React from 'react';
import { Tree } from 'react-arborist';

function TreeView({
  handleTreeEventDelete,
  visualHierarchyData,
  getCurrentNodeProps,
  handleContextMenu,
  setSelectedNodeId,
  setHoveredNodeId,
  handleRenameNode,
  handleDragDrop,
  hoveredNodeId,
  onDoubleClick,
  treeHeight,
  treeWidth,
  onClick,
  treeRef,
  style,
  term,
  indent = 20,
  fileIcon = '🗎 ',
  openFolderIcon = '🗁 ',
  closeFolderIcon = '🗀 ',
  showDeleteButton = true,
  showRenameButton = true,
  removeButton = { content: '🗑️', title: 'Delete' },
  renameButton = { content: '✏️', title: 'Rename...' },
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
        height={treeHeight}
        width={treeWidth}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
      >
        {(nodeProps) => {
          const isFile = nodeProps.node.isLeaf; // Returns true if the children property is not an array
          const isFolderOpen = nodeProps.node.isOpen; // Returns true if node is internal and in an open state

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
                setSelectedNodeId(nodeProps.node.id);
                // isInternal Returns true if the children property is an array
                !nodeProps.node.isInternal && onClick && onClick();
              }}
              onDoubleClick={() =>
                nodeProps.node.isInternal
                  ? nodeProps.node.toggle()
                  : onDoubleClick && onDoubleClick()
              }
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
              <span className="node-text">
                {!isFile
                  ? nodeProps.node.children.length > 0
                    ? isFolderOpen
                      ? '⏷ ' + openFolderIcon
                      : '⏵ ' + closeFolderIcon
                    : isFolderOpen
                    ? openFolderIcon
                    : closeFolderIcon
                  : fileIcon}
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
                    style={style.renameInput}
                  />
                ) : (
                  <span>{nodeProps.node.data.name}</span>
                )}
              </span>
              <span>
                {showRenameButton && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nodeProps.node.edit();
                    }}
                    title={renameButton.title}
                    style={style.renameButton}
                  >
                    {renameButton.content}
                  </button>
                )}
                {showDeleteButton && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nodeProps.tree.delete(nodeProps.node.id);
                    }}
                    title={removeButton.title}
                    style={style.removeButton}
                  >
                    {removeButton.content}
                  </button>
                )}
              </span>
            </div>
          );
        }}
      </Tree>
    </div>
  );
}

export default TreeView;
