/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function ListOfNotes({ data, listName, passIdToDel, btnName, addItem, passIdToOpen }) {
  return (
    <div
      className="list-of-notes"
      style={{ display: 'flex', flexDirection: 'column', width: 'full' }}
    >
      <div
        className="header"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontSize: '20px' }}>{listName}</div>
        <button
          onClick={() => addItem()}
          style={{ width: '54.5px', borderRadius: '12px' }}
        >
          Add
        </button>
      </div>
      <div className="notes" style={{ width: '80%' }}>
        {data.map(({ key, value }) => (
          <div
            key={key}
            className="note"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
            // eslint-disable-next-line react/jsx-no-comment-textnodes
          >
            <div onClick={(key) => console.log(key)} className="note-title">
              {/* <div onClick={(key) => passIdToOpen(key)} className="note-title"> */}
              {value.title}
            </div>
            <div className="note-btn">
              <button style={{ borderRadius: '5px' }} onClick={() => passIdToDel(key)}>
                {btnName}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfNotes;
