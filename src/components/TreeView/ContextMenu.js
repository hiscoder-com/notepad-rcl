import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
      {visible && treeRef && style && (
        <div
          style={{
            ...style.contextMenuWrapper,
            top: style.contextMenuWrapper.top || position.top + 'px',
            left: style.contextMenuWrapper.left || position.left + 'px',
          }}
        >
          <div style={style.contextMenuContainer}>
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <MenuItem key={item.id} itemId={item.id} onClick={item.action}>
                  <span>{item.label}</span>
                </MenuItem>
              ))
            ) : (
              <div style={style.emptyMenu}>No menu items provided.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

ContextMenu.defaultProps = {
  selectedNodeId: null,
  setSelectedNodeId: () => {},
  menuItems: [],
  treeRef: null,
  style: null,
  data: null,
};

ContextMenu.propTypes = {
  /** ID of the selected node in the tree structure */
  selectedNodeId: PropTypes.string,
  /** Function to set the selected node */
  setSelectedNodeId: PropTypes.func,
  /** Array of context menu items */
  menuItems: PropTypes.array,
  /** Tree component reference */
  treeRef: PropTypes.object,
  /** Component styles */
  style: PropTypes.object,
  /** An object that contains information about the event that triggers the context menu */
  data: PropTypes.object,
};

export default ContextMenu;
