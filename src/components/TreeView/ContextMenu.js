import React, { useEffect, useState } from 'react';

function ContextMenu({
  setSelectedNodeId,
  selectedNodeId,
  menuItems,
  treeRef,
  style,
  data,
}) {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

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

  const hideContextMenu = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div
          style={{
            ...style.contextMenuWrapper,
            top: style.contextMenuWrapper.top || position.top + 'px',
            left: style.contextMenuWrapper.left || position.left + 'px',
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
