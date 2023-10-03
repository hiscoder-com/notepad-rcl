import React, { useEffect, useState } from 'react';

function ContextMenu({
  setSelectedNodeId,
  currentNodeProps,
  selectedNodeId,
  onNewDocument,
  onNewFolder,
  treeRef,
  style,
  data,
}) {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleNewDocument = () => {
    onNewDocument();
    hideContextMenu();
  };

  const handleNewFolder = () => {
    onNewFolder();
    hideContextMenu();
  };

  const handleRename = () => {
    currentNodeProps.node.edit();
    hideContextMenu();
  };

  const handleDelete = () => {
    currentNodeProps.tree.delete(currentNodeProps.node.id);
    hideContextMenu();
  };

  const menuItems = [
    { id: 'newDocument', label: '📄 New document', action: handleNewDocument },
    { id: 'newFolder', label: '📁 New folder', action: handleNewFolder },
    { id: 'rename', label: '✏️ Rename', action: handleRename },
    { id: 'delete', label: '🗑️ Delete', action: handleDelete },
  ];

  function MenuItem({ onClick, itemId, children }) {
    const isHovered = itemId === hoveredItemId;

    return (
      <div
        style={{
          ...style.contextMenuItem,
          backgroundColor: isHovered
            ? style.contextMenuItem.hoveredColor
            : style.contextMenuItem.backgroundColor,
        }}
        onClick={onClick}
        onMouseEnter={() => handleMouseEnter(itemId)}
        onMouseLeave={() => handleMouseEnter(null)}
      >
        {children}
      </div>
    );
  }

  useEffect(() => {
    if (visible) {
      setVisible(false);
    }

    const handleScroll = () => {
      hideContextMenu();
    };

    const handleOutsideClick = (event) => {
      if (treeRef.current && !treeRef.current.contains(event.target)) {
        setSelectedNodeId(null);
        hideContextMenu();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedNodeId]);

  useEffect(() => {
    if (data) {
      const { event } = data;
      if (selectedNodeId) {
        setVisible(true);
        setPosition({ top: event.clientY, left: event.clientX });
      }
    } else {
      setVisible(false);
    }
  }, [data]);

  const hideContextMenu = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div
          style={{
            ...style.contextMenuWrapperStyle,
            top: style.contextMenuWrapperStyle.top || position.top + 'px',
            left: style.contextMenuWrapperStyle.left || position.left + 'px',
          }}
        >
          <div style={style.contextMenuContainer}>
            {menuItems.map((item) => (
              <MenuItem key={item.id} itemId={item.id} onClick={item.action}>
                <span>{item.label}</span>
              </MenuItem>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ContextMenu;
