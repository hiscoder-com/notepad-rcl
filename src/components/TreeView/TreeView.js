import React from 'react';
import { Tree } from 'react-arborist';
import PropTypes from 'prop-types';

function TreeView({
  handleTreeEventDelete,
  getCurrentNodeProps,
  handleContextMenu,
  setSelectedNodeId,
  customContextMenu,
  setHoveredNodeId,
  handleRenameNode,
  showDeleteButton,
  showRenameButton,
  closeFolderIcon,
  selectedNodeId,
  handleDragDrop,
  openFolderIcon,
  hoveredNodeId,
  onDoubleClick,
  removeButton,
  renameButton,
  treeHeight,
  nodeHeight,
  arrowRight,
  arrowDown,
  treeWidth,
  fileIcon,
  classes,
  onClick,
  treeRef,
  indent,
  style,
  data,
  term,
}) {
  return (
    <div
      ref={treeRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={classes?.treeContainer}
      style={style?.treeContainer}
    >
      <Tree
        data={data}
        width={treeWidth}
        searchTerm={term}
        height={treeHeight}
        rowHeight={nodeHeight}
        onMove={handleDragDrop}
        onDelete={handleTreeEventDelete}
        onContextMenu={handleContextMenu}
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
              className={classes?.nodeWrapper}
              style={{
                ...style?.nodeWrapper,
                marginLeft: `${nodeProps.node.level * indent}px`,
                backgroundColor: style?.nodeWrapper
                  ? nodeProps.node.id === selectedNodeId
                    ? style?.nodeWrapper.selectedColor
                    : nodeProps.node.id === hoveredNodeId
                    ? style?.nodeWrapper.hoveredColor
                    : style?.nodeWrapper.backgroundColor
                  : null,
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
              <div
                className={classes?.nodeTextBlock}
                style={{ ...style?.nodeTextBlock, display: 'flex', gap: '7px' }}
              >
                {!isFile ? (
                  nodeProps.node.children.length > 0 ? (
                    isFolderOpen ? (
                      <>
                        {arrowDown} {openFolderIcon}
                      </>
                    ) : (
                      <>
                        {arrowRight} {closeFolderIcon}
                      </>
                    )
                  ) : isFolderOpen ? (
                    openFolderIcon
                  ) : (
                    closeFolderIcon
                  )
                ) : (
                  fileIcon
                )}
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
                    style={style?.renameInput}
                    className={classes?.renameInput}
                  />
                ) : (
                  <div className={classes?.nodeText} style={style?.nodeText}>
                    {nodeProps.node.data.name}
                  </div>
                )}
              </div>
              <div className={classes?.nodeButtonBlock} style={style?.nodeButtonBlock}>
                {showRenameButton && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nodeProps.node.edit();
                    }}
                    title={renameButton.title}
                    style={style?.renameButton}
                    className={classes?.renameButton}
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
                    style={style?.removeButton}
                    className={classes?.removeButton}
                  >
                    {removeButton.content}
                  </button>
                )}
              </div>
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
  classes: null,
  style: null,
  data: null,
  term: '',
  indent: 20,
  fileIcon: '🗎',
  openFolderIcon: '🗁',
  arrowDown: '⏷',
  arrowRight: '⏵',
  closeFolderIcon: '🗀',
  showDeleteButton: false,
  showRenameButton: false,
  removeButton: { content: '🗑️', title: 'Delete' },
  renameButton: { content: '✏️', title: 'Rename...' },
};

TreeView.propTypes = {
  /** Tree element deletion event handler function */
  handleTreeEventDelete: PropTypes.func,
  /** responsible for disabling the standard context menu */
  customContextMenu: PropTypes.bool,
  /** Data for visual representation of hierarchy */
  data: PropTypes.array,
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
  /** Class names for various elements */
  classes: PropTypes.shape({
    /** Class for the container of the tree */
    treeContainer: PropTypes.string,
    /** Class for a node in a tree */
    nodeWrapper: PropTypes.string,
    /** Class for the text block of a node */
    nodeTextBlock: PropTypes.string,
    /** Class for the input field when renaming */
    renameInput: PropTypes.string,
    /** Class for the text of a node */
    nodeText: PropTypes.string,
    /** Class for the button block of a node */
    nodeButtonBlock: PropTypes.string,
    /** Class for the rename button */
    renameButton: PropTypes.string,
    /** Class for the remove button */
    removeButton: PropTypes.string,
  }),
  /** Component styles */
  style: PropTypes.shape({
    /** Styles for the container of the tree */
    treeContainer: PropTypes.object,
    /** Style for a single node item with background colors for normal (backgroundColor), hover (hoveredColor), and selected (selectedColor) states. */
    nodeWrapper: PropTypes.object,
    /** Styles for the text block of a node */
    nodeTextBlock: PropTypes.object,
    /** Style for the input field when renaming */
    renameInput: PropTypes.object,
    /** Styles for the text of a node */
    nodeText: PropTypes.object,
    /** Styles for the button block of a node */
    nodeButtonBlock: PropTypes.object,
    /** Style for the rename button */
    renameButton: PropTypes.object,
    /** Style for the delete button */
    removeButton: PropTypes.object,
  }),
  /** Search query */
  term: PropTypes.string,
  /** Indentation between nesting levels */
  indent: PropTypes.number,
  /** File icon */
  fileIcon: PropTypes.node,
  /** Open folder icon */
  openFolderIcon: PropTypes.node,
  /** Arrow icon for expanding tree nodes */
  arrowDown: PropTypes.node,
  /** Arrow icon for collapsing tree nodes */
  arrowRight: PropTypes.node,
  /** Closed folder icon */
  closeFolderIcon: PropTypes.node,
  /** Show delete button */
  showDeleteButton: PropTypes.bool,
  /** Show rename button */
  showRenameButton: PropTypes.bool,
  /** Delete button with content and title */
  removeButton: PropTypes.shape({
    content: PropTypes.node,
    title: PropTypes.string,
  }),
  /** Rename button with content and title */
  renameButton: PropTypes.shape({
    content: PropTypes.node,
    title: PropTypes.string,
  }),
};

export default TreeView;
