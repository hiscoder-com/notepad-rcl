/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function ListOfNotes({
  data,
  listName,
  passIdToDel,
  addBtnName,
  delBtnName,
  addItem,
  passIdToOpen,
  headerStyle,
  headerBlockStyle,
  addBtnStyle,
  noteTitleStyle,
  listOfNotesStyle,
  noteStyle,
}) {
  const defaultHeaderBlockStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: '20px',
  };
  const defaultHeaderStyle = { fontSize: '20px' };
  const defaultAddBtnStyle = { width: '54.5px', borderRadius: '12px' };
  const defaultListOfNotesStyle = { width: '80%' };
  const defaultNoteStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px',
  };
  const defaultDelBtnStyle = { borderRadius: '5px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 'full' }}>
      <div style={headerBlockStyle || defaultHeaderBlockStyle}>
        <div style={headerStyle || defaultHeaderStyle}>{listName}</div>
        <button onClick={addItem} style={addBtnStyle || defaultAddBtnStyle}>
          {addBtnName || 'Add'}
        </button>
      </div>
      <div style={listOfNotesStyle || defaultListOfNotesStyle}>
        {data.map(({ key, value }) => (
          <div key={key} style={noteStyle || defaultNoteStyle}>
            <div onClick={() => passIdToOpen(key)} style={noteTitleStyle}>
              {value.title}
            </div>
            <div className="note-btn">
              <button style={defaultDelBtnStyle} onClick={() => passIdToDel(key)}>
                {delBtnName || 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfNotes;
