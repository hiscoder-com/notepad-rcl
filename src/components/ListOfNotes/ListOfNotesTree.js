/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';

import { Tree } from 'react-complex-tree';

import PropTypes from 'prop-types';

function ListOfNotesTree({
  classes,
  style,
  notes,
  icons,
  activeNote,
  setActiveNote,
  removeNote,
  delBtnIcon,
  delBtnName,
}) {
  const makeTree = (id, parentBC, notes) =>
    notes
      .filter(({ parent_id }) => parent_id == id)
      .map(({ id, title, ...other }) => ({
        id,
        title,
        parentBC,
        children: makeTree(id, `${parentBC}/${title}`, notes),
        ...other,
      }));

  const [data, setData] = useState({});

  useEffect(() => {
    const tree = makeTree(null, '', notes);

    setData({
      title: 'root',
      toggled: true,
      is_folder: true,
      children: tree,
    });
  }, [notes]);

  const onToggle = (node, toggled) => {
    if (activeNote) {
      activeNote.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setActiveNote(node);
    setData((prevData) => ({ ...prevData }));
  };

  const Container = (props) => {
    const { node } = props;
    const isActiveNote = activeNote?.id === node.id;

    const handleClick = (e) => {
      e.stopPropagation();
      removeNote(node.id);
    };

    return (
      <div
        className={`${isActiveNote ? classes?.bgActiveNote : ''} ${classes.wrapper}`}
        onClick={props.onClick}
      >
        <div className={classes.icon}>
          {node.is_folder
            ? node.toggled
              ? icons.openedFolder
              : icons.closedFolder
            : icons.note}
        </div>
        <div className={classes.title}>{node.title}</div>
        <div className={classes.delBtn} onClick={handleClick}>
          {delBtnIcon}
          {delBtnName}
        </div>
      </div>
    );
  };

  return (
    <Tree
      style={style}
      data={data}
      toggled={true}
      onToggle={onToggle}
      decorators={{ Container, Toggle: () => <div></div> }}
    />
  );
}

ListOfNotesTree.defaultProps = {
  activeNote: null,
  setActiveNote: () => {},
  notes: [],
  classes: {},
  icons: {},
  style: {},
  delBtnIcon: '',
  delBtnName: '',
};

ListOfNotesTree.propTypes = {
  /** note which highlight in list */
  activeNote: PropTypes.object,
  /** state function which set new value of activeNote*/
  setActiveNote: PropTypes.func,
  /** array of notes*/
  notes: PropTypes.array,
  /**  */
  classes: PropTypes.object,
  /** icons of list */
  icons: PropTypes.shape({
    /** icons of item at list when folder is close */
    closedFolder: PropTypes.node,
    /** icons of item at list when folder is open */
    openedFolder: PropTypes.node,
    /** icons of note  */
    note: PropTypes.node,
  }),
  /**  */
  delBtnIcon: PropTypes.node,
  /**  */
  delBtnName: PropTypes.string,
  style: PropTypes.shape({}),
};

export default ListOfNotesTree;
