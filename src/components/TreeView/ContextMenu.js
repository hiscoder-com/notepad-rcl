import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ContextMenu({
  setSelectedNodeId,
  selectedNodeId,
  menuItems,
  nodeProps,
  classes,
  styles,
  data,
}) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (visible) {
      setVisible(false);
    }

    const handleScroll = () => {
      hideContextMenu();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedNodeId]);

  useEffect(() => {
    if (selectedNodeId && nodeProps?.tree.props.data.length > 0) {
      const { event } = data;
      setVisible(true);
      setPosition({ top: event.clientY, left: event.clientX });
    }
  }, [data]);

  function MenuItem({ onClick, icon, children }) {
    return (
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={classes?.menuItem}
        style={{
          ...styles?.menuItem,
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={onClick}
      >
        {icon} <span>{children}</span>
      </div>
    );
  }

  const hideContextMenu = () => {
    setSelectedNodeId(null);
  };

  return (
    <>
      {visible && nodeProps.tree.props.data.length > 0 && (styles || classes) && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}
          onClick={hideContextMenu}
          onContextMenu={(e) => {
            e.preventDefault();
            hideContextMenu();
          }}
        >
          <div
            style={{
              ...styles?.menuWrapper,
              position: 'fixed',
              top: styles?.menuWrapper?.top || position.top + 'px',
              left: styles?.menuWrapper?.left || position.left + 'px',
            }}
          >
            <div className={classes?.menuContainer} style={styles?.menuContainer}>
              {menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <MenuItem key={item.id} onClick={item.action} icon={item.icon}>
                    <span>{item.label}</span>
                  </MenuItem>
                ))
              ) : (
                <div className={classes?.emptyMenu} style={styles?.emptyMenu}>
                  No menu items provided.
                </div>
              )}
            </div>
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
  classes: null,
  nodeProps: {},
  styles: null,
  data: null,
};

ContextMenu.propTypes = {
  /** Properties of the current node */
  nodeProps: PropTypes.object,
  /** ID of the selected node in the tree structure */
  selectedNodeId: PropTypes.string,
  /** Function to set the selected node */
  setSelectedNodeId: PropTypes.func,
  /** Array of context menu items */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.element,
      label: PropTypes.string,
      action: PropTypes.func,
    })
  ),
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
  styles: PropTypes.shape({
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
