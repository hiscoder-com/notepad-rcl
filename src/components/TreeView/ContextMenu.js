import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ContextMenu({
  isVisible = false,
  setIsVisible = () => {},
  menuItems = [],
  nodeProps = {},
  classes = null,
  styles = null,
  clickMenuEvent = null,
  emptyMenuText = 'No menu items provided.',
  isRtl = false,
}) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const direction = isRtl ? 'rtl' : 'ltr';
  const [isOpen, setIsOpen] = useState(isVisible);
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }

    const handleScroll = () => {
      hideContextMenu();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && nodeProps?.tree.props.data.length > 0) {
      const { event } = clickMenuEvent;
      setPosition({ top: event.clientY, left: event.clientX });
      setIsOpen(true);
    }
  }, [clickMenuEvent]);

  function MenuItem({ onClick, children }) {
    return (
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={classes?.menuItem}
        style={styles?.menuItem}
        onClick={onClick}
        dir={direction}
      >
        {children}
      </div>
    );
  }

  const hideContextMenu = () => {
    setIsVisible(false);
  };
  return (
    <>
      {isOpen && nodeProps?.tree.props.data.length > 0 && (
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
                  <MenuItem key={item.id} onClick={item.action}>
                    {item.buttonContent}
                  </MenuItem>
                ))
              ) : (
                <div className={classes?.emptyMenu} style={styles?.emptyMenu}>
                  {emptyMenuText}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ContextMenu.propTypes = {
  /** Properties of the current node */
  nodeProps: PropTypes.object,
  /** If there is no menuItems, then we will see this text */
  emptyMenuText: PropTypes.string,
  /** Indicates whether the context menu is visible or not */
  isVisible: PropTypes.bool,
  /** Function to control the visibility of the context menu */
  setIsVisible: PropTypes.func,
  /** Array of context menu items */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      buttonContent: PropTypes.node,
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
  clickMenuEvent: PropTypes.object,
  /** if true, display menu in rtl direction */
  isRtl: PropTypes.bool,
};

export default ContextMenu;
