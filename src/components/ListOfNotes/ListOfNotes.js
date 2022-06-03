import React from 'react';

function ListOfNotes({ data, listName }) {
  return (
    <div
      className="list-of-notes"
      style={{ display: 'flex', flexDirection: 'column', width: '500px' }}
    >
      <div className="header">
        <h1>{listName}</h1>
      </div>
      <div className="notes" style={{ width: '300px' }}>
        {data.map(({ key }) => (
          <div
            key={key}
            className="note"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <div className="note-title">{key}</div>
            <div className="note-btn">
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfNotes;
