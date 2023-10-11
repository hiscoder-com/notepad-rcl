import React from 'react';
import { Tree } from 'react-arborist';
import PropTypes from 'prop-types';

function TreeView({
  handleTreeEventDelete,
  visualHierarchyData,
  getCurrentNodeProps,
  handleContextMenu,
  setSelectedNodeId,
  customContextMenu,
  setHoveredNodeId,
  handleRenameNode,
  showDeleteButton,
  showRenameButton,
  closeFolderIcon,
  handleDragDrop,
  openFolderIcon,
  hoveredNodeId,
  onDoubleClick,
  removeButton,
  renameButton,
  treeHeight,
  treeWidth,
  fileIcon,
  onClick,
  treeRef,
  indent,
  style,
  term,
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
                setSelectedNodeId(nodeProps.node.id);
                !nodeProps.node.isInternal && onClick && onClick();
              }}
              onDoubleClick={() =>
                nodeProps.node.isInternal
                  ? nodeProps.node.toggle()
                  : onDoubleClick && onDoubleClick()
              }
              onContextMenu={(event) => {
                customContextMenu && event.preventDefault();
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

TreeView.defaultProps = {
  customContextMenu: false,
  handleTreeEventDelete: () => {},
  visualHierarchyData: [],
  getCurrentNodeProps: () => {},
  handleContextMenu: () => {},
  setSelectedNodeId: () => {},
  setHoveredNodeId: () => {},
  handleRenameNode: () => {},
  handleDragDrop: () => {},
  hoveredNodeId: null,
  onDoubleClick: () => {},
  onClick: () => {},
  treeRef: null,
  style: {},
  term: '',
  indent: 20,
  fileIcon: '🗎 ',
  openFolderIcon: '🗁 ',
  closeFolderIcon: '🗀 ',
  showDeleteButton: true,
  showRenameButton: true,
  removeButton: { content: '🗑️', title: 'Delete' },
  renameButton: { content: '✏️', title: 'Rename...' },
};

TreeView.propTypes = {
  /** Tree element deletion event handler function */
  handleTreeEventDelete: PropTypes.func,
  /** responsible for disabling the standard context menu */
  customContextMenu: PropTypes.bool,
  /** Data for visual representation of hierarchy */
  visualHierarchyData: PropTypes.array,
  /** Function to get properties of the current node */
  getCurrentNodeProps: PropTypes.func,
  /** Context menu handler function */
  handleContextMenu: PropTypes.func,
  /** Function to set the selected node */
  setSelectedNodeId: PropTypes.func,
  /** Function to set hover node */
  setHoveredNodeId: PropTypes.func,
  /** Node rename handler function */
  handleRenameNode: PropTypes.func,
  /** Node drag handler function */
  handleDragDrop: PropTypes.func,
  /** Hover node ID */
  hoveredNodeId: PropTypes.string,
  /** Double click handler function */
  onDoubleClick: PropTypes.func,
  /** Tree height */
  treeHeight: PropTypes.number,
  /** Tree width */
  treeWidth: PropTypes.number,
  /** Click handler function */
  onClick: PropTypes.func,
  /** Tree component reference */
  treeRef: PropTypes.object,
  /** Component styles */
  style: PropTypes.shape({
    nodeStyle: PropTypes.object,
    renameInput: PropTypes.object,
    renameButton: PropTypes.object,
    removeButton: PropTypes.object,
  }),
  /** Search query */
  term: PropTypes.string,
  /** Indentation between nesting levels */
  indent: PropTypes.number,
  /** File icon */
  fileIcon: PropTypes.string,
  /** Open folder icon */
  openFolderIcon: PropTypes.string,
  /** Closed folder icon */
  closeFolderIcon: PropTypes.string,
  /** Show delete button */
  showDeleteButton: PropTypes.bool,
  /** Show rename button */
  showRenameButton: PropTypes.bool,
  /** Delete button with content and title */
  removeButton: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
  }),
  /** Rename button with content and title */
  renameButton: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default TreeView;
