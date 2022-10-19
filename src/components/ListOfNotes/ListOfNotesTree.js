/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Treebeard } from 'react-treebeard';
import PropTypes from 'prop-types';

function ListOfNotesTree({ notes, icons, activeNote, setActiveNote }) {
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
      name: 'root',
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
          className={`flex cursor-pointer  ${
            activeNote?.id == props.node.id ? 'bg-gray-200' : ''
          }`}
          onClick={() => {
            props.onClick();
          }}
        >
          {props.node.isFolder
            ? !props.node.toggled
              ? icons.closedFolder
              : icons.openedFolder
            : icons.note}
          <div className="ml-3">{props.node.title}</div>
        </div>
      );
    },
  };
  return (
    <Treebeard
      style={{
        tree: {
          base: { backgroundColor: '#fff' },
          node: {
            base: {
              position: 'relative',
            },
            link: {
              cursor: 'pointer',
              position: 'relative',
              padding: '0px 5px',
              display: 'block',
            },
          },
        },
      }}
      data={data}
      toggled={true}
      onToggle={onToggle}
      decorators={decorators}
    />
  );
}

ListOfNotesTree.defaultProps = {
  notes: [],
  classes: {},
  dateOptions: {},
};

ListOfNotesTree.propTypes = {
  dateOptions: PropTypes.object, //TODO сделать ссылку на документацию в MDN,
  //TODO добавить описание классов classes: wrapper,title,item,delBtn,delBtnIcon,date,text
  /** add button name */
  addBtnName: PropTypes.string,
  /** Receives the id at the entrance  */
  addNote: PropTypes.func,
  /** delete button name */
  delBtnName: PropTypes.string,
  /** array of existing notes */
  notes: PropTypes.array,
  /** Receives the id at the entrance */
  removeNote: PropTypes.func,
  /** Receives the id at the entrance */
  setAddedNoteId: PropTypes.func,
  style: PropTypes.shape({
    /** style for add button */
    addBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for delete button */
    delBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for header block */
    headerBlockStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for list of notes */
    listOfNotes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for note */
    note: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

export default ListOfNotesTree;
