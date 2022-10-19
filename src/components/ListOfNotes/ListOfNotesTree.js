/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Treebeard } from 'react-treebeard';
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
        ...other,
        title,
        parentBC,
        children: makeTree(id, parentBC + '/' + title, notes),
      }));

  const [data, setData] = useState({});
  useEffect(() => {
    const tree = makeTree(null, '', notes);

    setData({
      title: 'root',
      toggled: true,
      isFolder: true,
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
    setData(Object.assign({}, data));
  };
  const decorators = {
    Toggle: (props) => {
      return <div style={props.style}></div>;
    },

    Container: (props) => {
      return (
        <div
          className={`${
            activeNote?.id == props.node.id ? `${classes?.bgActiveNote}` : ''
          } ${classes.wrapper}`}
          onClick={() => {
            props.onClick();
          }}
        >
          <div className={classes.icon}>
            {props.node.isFolder
              ? !props.node.toggled
                ? icons.closedFolder
                : icons.openedFolder
              : icons.note}
          </div>
          <div className={classes.title}>{props.node.title}</div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              removeNote(props.node.id);
            }}
            className={classes.delBtn}
          >
            {delBtnIcon}
            {delBtnName}
          </div>
        </div>
      );
    },
  };
  return (
    <Treebeard
      style={style}
      data={data}
      toggled={true}
      onToggle={onToggle}
      decorators={decorators}
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
  delBtnIcon: PropTypes.node,
  delBtnName: PropTypes.string,
  style: PropTypes.shape({}),
};

export default ListOfNotesTree;
