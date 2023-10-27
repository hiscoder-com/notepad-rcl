import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ContextMenu({
  setSelectedNodeId,
  selectedNodeId,
  menuItems,
  treeRef,
  classes,
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
        onContextMenu={(e) => e.preventDefault()}
        className={classes?.menuItem}
        style={{
          ...style?.menuItem,
          backgroundColor: isHovered
            ? style?.menuItem?.hoveredColor
            : style?.menuItem?.backgroundColor,
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
      {visible && treeRef && (style || classes) && (
        <div
          className={`${classes?.menuWrapper} top-[${position.top + 'px'}] left-[${
            position.left + 'px'
          }]`}
          style={{
            ...style?.menuWrapper,
            top: style?.menuWrapper?.top || position.top + 'px',
            left: style?.menuWrapper?.left || position.left + 'px',
          }}
        >
          <div className={classes?.menuContainer} style={style?.menuContainer}>
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <MenuItem key={item.id} itemId={item.id} onClick={item.action}>
                  <span>{item.label}</span>
                </MenuItem>
              ))
            ) : (
              <div className={classes?.emptyMenu} style={style?.emptyMenu}>
                No menu items provided.
              </div>
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
  classes: null,
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
  /** Class names for various elements */
  classes: PropTypes.shape({
    /** Class for a single menu item */
    menuItem: PropTypes.string,
    /** Class to wrap the entire context menu */
    menuWrapper: PropTypes.string,
    /** Class for the menu item container */
    menuContainer: PropTypes.string,
    /** Class for the message "No menu items" */
    emptyMenu: PropTypes.string,
  }),

  /** Component styles */
  style: PropTypes.shape({
    /** Style for a single menu item with background colors for normal (backgroundColor) and hover states (hoveredColor). */
    menuItem: PropTypes.object,
    /** Style to wrap the entire context menu */
    menuWrapper: PropTypes.object,
    /** Style for the menu item container */
    menuContainer: PropTypes.object,
    /** Style for the message "No menu items" */
    emptyMenu: PropTypes.object,
  }),

  /** An object that contains information about the event that triggers the context menu */
  data: PropTypes.object,
};

export default ContextMenu;
