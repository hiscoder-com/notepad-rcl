import React from 'react';

function ListOfNotes({ data, listName, passId, btnName, addItem }) {
  return (
    <div
      className="list-of-notes"
      style={{ display: 'flex', flexDirection: 'column', width: '500px' }}
    >
      <div
        className="header"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '300px',
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
      <div className="notes" style={{ width: '300px' }}>
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
          >
            <div className="note-title">{value.title}</div>
            <div className="note-btn">
              <button style={{ borderRadius: '5px' }} onClick={() => passId(key)}>
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
